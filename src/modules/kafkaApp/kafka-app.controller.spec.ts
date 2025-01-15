import { Test, TestingModule } from '@nestjs/testing';
import { KafkaAppController } from './kafka-app.controller';

describe('KafkaAppController', () => {
  let controller: KafkaAppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KafkaAppController],
    }).compile();

    controller = module.get<KafkaAppController>(KafkaAppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
