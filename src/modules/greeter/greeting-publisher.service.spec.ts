import { Test, TestingModule } from '@nestjs/testing';
import { GreetingPublisherService } from './greeting-publisher.service';

describe('GreetingPublisherService', () => {
  let service: GreetingPublisherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GreetingPublisherService],
    }).compile();

    service = module.get<GreetingPublisherService>(GreetingPublisherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
