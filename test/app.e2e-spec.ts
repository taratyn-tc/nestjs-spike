import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // need to turn this on just like we do in `main.ts`.
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('/greeter/greet', () => {
    describe('POST', () => {
      it('should return a greeting', () => {
        return request(app.getHttpServer())
          .post('/greeter/greet')
          .send({ name: 'Alice' })
          .expect(201)
          .expect({ greeting: 'Hello, Alice!' });
      });
      it('should require a name', () => {
        return request(app.getHttpServer())
          .post('/greeter/greet')
          .send({})
          .expect(400)
          .expect({
            statusCode: 400,
            error: 'Bad Request',
            message: ['name should not be empty'],
          });
      });
    });
  });
});
