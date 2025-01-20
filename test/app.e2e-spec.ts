import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { WebappModule } from '../src/modules/webapp/webapp.module';
import { validate } from 'class-validator';
import { Response } from 'superagent';
import { dataSourceOptions } from '../src/rootDataSourceConfig';
import { Greeted } from '../src/modules/greeter/greeted.entity';
import { DataSource, Repository } from 'typeorm';

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

      beforeEach(async () => {
        initialGreetedCount = await repository.count();
        response = await request(app.getHttpServer())
          .post('/greeter/greet')
          .send({ name: 'Alice', formality: 'formal' });
      });

      it('should return a greeting', async () => {
        expect(response.body).toEqual({ greeting: 'Greetings, Alice!' });
        expect(response.status).toEqual(201);
        const countAfterOperation = await repository.count();
        expect(countAfterOperation).toEqual(initialGreetedCount + 1);
      });
      it.skip('should return a valid response DTO', async () => {
        const { body } = response;
        const errors = await validate('GreetingResponseDto', body);
        expect(errors).not.toHaveLength(0);
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
