import { Test, TestingModule } from '@nestjs/testing';
import { GreetingPublisherService } from './greeting-publisher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Greeted } from './greeted.entity';
import { GreetingRequestDto } from './greeterRequest.dto';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';

describe('GreetingPublisherService', () => {
  let service: GreetingPublisherService;
  let mockKafkaClient: { emit: jest.Mock<any, any, any> };

  beforeEach(async () => {
    const emitObs = new Observable((subscriber) => {
      subscriber.next(1);
      subscriber.complete();
    });
    mockKafkaClient = {
      emit: jest.fn().mockReturnValue(emitObs),
    };
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Greeted],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Greeted]),
        ClientsModule.registerAsync([
          {
            name: 'KAFKA_SERVICE',
            useFactory: async () => {
              return {
                transport: Transport.KAFKA,
                options: {
                  producerOnlyMode: true,
                  client: {
                    clientId: 'SpikeyGreeter',
                    brokers: ['localhost:9092'],
                  },
                },
              };
            },
          },
        ]),
      ],
      providers: [GreetingPublisherService],
    })
      .overrideProvider('KAFKA_SERVICE')
      .useValue(mockKafkaClient)
      .compile();

    service = module.get<GreetingPublisherService>(GreetingPublisherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should publish a greeting', async () => {
    const greeting = 'Hello, Alice!';
    const param: GreetingRequestDto = new GreetingRequestDto();
    param.name = 'Test';
    const initialCount = await service.countGreeted();
    await service.publishGreeting(greeting, param);
    expect(mockKafkaClient.emit).toHaveBeenCalledTimes(1);
    const afterGreetingCount = await service.countGreeted();
    expect(afterGreetingCount).toBeGreaterThan(initialCount);
  });
});
