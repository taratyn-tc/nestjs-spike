import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { validate } from 'class-validator';
import { GreetingResponseDto } from '../src/modules/greeter/greetingResponse.dto';
import { Response } from 'superagent';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // need to turn this on just like we do in `main.ts`.
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
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
      let response: Response;
      beforeEach(async () => {
        response = await request(app.getHttpServer())
          .post('/greeter/greet')
          .send({ name: 'Alice' });
      });

      it('should return a greeting', () => {
        expect(response.status).toEqual(201);
        expect(response.body).toEqual({ greeting: 'Hello, Alice!' });
      });
      it('should return a valid response DTO', async () => {
        const { body } = await response;
        const errors = await validate(body, GreetingResponseDto);
        expect(errors).toHaveLength(0);
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
