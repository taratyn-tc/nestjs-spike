import { Test, TestingModule } from '@nestjs/testing';
import { WebappController } from './webapp.controller';
import { WebappService } from './webapp.service';

describe('AppController', () => {
  let appController: WebappController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WebappController],
      providers: [WebappService],
    }).compile();

    appController = app.get<WebappController>(WebappController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
