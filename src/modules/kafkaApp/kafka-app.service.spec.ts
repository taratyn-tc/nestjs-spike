import { Test, TestingModule } from '@nestjs/testing';
import { KafkaAppService } from './kafka-app.service';

describe('KafkaAppService', () => {
  let service: KafkaAppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KafkaAppService],
    }).compile();

    service = module.get<KafkaAppService>(KafkaAppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
