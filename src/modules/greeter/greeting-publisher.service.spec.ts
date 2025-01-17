import { Test, TestingModule } from '@nestjs/testing';
import { GreetingPublisherService } from './greeting-publisher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Greeted } from './greeted.entity';

describe('GreetingPublisherService', () => {
  let service: GreetingPublisherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Greeted],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Greeted]),
      ],
      providers: [GreetingPublisherService],
    }).compile();

    service = module.get<GreetingPublisherService>(GreetingPublisherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
