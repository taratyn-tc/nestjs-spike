import { Module } from '@nestjs/common';
import { GreeterService } from './greeter.service';
import { GreeterController } from './greeter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Greeted } from './greeted.entity';
import { GreetingPublisherService } from './greeting-publisher.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Greeted]),
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        useFactory: async () => ({
          transport: Transport.KAFKA,
          options: {
            producerOnlyMode: true,
            client: {
              clientId: 'SpikeyGreeter',
              brokers: ['localhost:9092'],
            },
          },
        }),
      },
    ]),
  ],
  providers: [GreeterService, GreetingPublisherService],
  controllers: [GreeterController],
  exports: [GreeterService],
})
export class GreeterModule {}
