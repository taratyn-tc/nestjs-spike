import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { WebappModule } from '../src/modules/webapp/webapp.module';
import { Response } from 'superagent';
import { dataSourceOptions } from '../src/rootDataSourceConfig';
import { Greeted } from '../src/modules/greeter/greeted.entity';
import { DataSource, Repository } from 'typeorm';
import { Consumer, EachMessagePayload, Kafka } from 'kafkajs';

let repository: Repository<Greeted>;
let dataSource: DataSource;
beforeAll(async () => {
  dataSource = new DataSource(dataSourceOptions);
  await dataSource.initialize();
  repository = dataSource.getRepository<Greeted>(Greeted);
});

afterAll(async () => {
  await dataSource.destroy();
});

let consumer: Consumer;
const greetedL0Messages: EachMessagePayload[] = [];
beforeAll(async () => {
  const seed = jest.getSeed();
  const kafka = new Kafka({
    clientId: `spikey-e2e-${seed}`,
    brokers: ['localhost:9092'],
  });
  consumer = kafka.consumer({
    groupId: `e2e-greetings-${seed}`,
  });

  const joinedGroup: Promise<void> = new Promise((resolve) => {
    consumer.on('consumer.group_join', () => {
      resolve();
    });
  });
  await consumer.subscribe({ topic: 'greeted.l0' });
  await consumer.run({
    eachMessage: async (payload: EachMessagePayload): Promise<void> => {
      greetedL0Messages.push(payload);
    },
  });
  await joinedGroup;
});

afterAll(async () => {
  await consumer.disconnect();
});

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [WebappModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // need to turn this on just like we do in `main.ts`.
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });
  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('/greeter/greet', () => {
    describe('POST', () => {
      let response: Response;
      let initialGreetedCount: number;
      let name: string;

      beforeEach(async () => {
        initialGreetedCount = await repository.count();
        name = `Alice-${jest.getSeed()}`;
        response = await request(app.getHttpServer())
          .post('/greeter/greet')
          .send({ name, formality: 'formal' });
      });

      it('should return a greeting', async () => {
        expect(response.body).toEqual({ greeting: `Greetings, ${name}!` });
        expect(response.status).toEqual(201);
        const countAfterOperation = await repository.count();
        expect(countAfterOperation).toEqual(initialGreetedCount + 1);
        expect(
          greetedL0Messages.findIndex((v) =>
            v.message.value?.toString().includes(name),
          ),
        ).not.toEqual(-1);
      });

      it('should require a name', async () => {
        await request(app.getHttpServer())
          .post('/greeter/greet')
          .send({})
          .expect(400)
          .expect({
            statusCode: 400,
            error: 'Bad Request',
            message: [
              'name should not be empty',
              'formality must be one of the following values: normal, informal, formal',
            ],
          });
      });
    });
  });
});
