import { Module } from '@nestjs/common';
import { KafkaAppController } from './kafka-app.controller';
import { KafkaAppService } from './kafka-app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SPIKEY_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'spikey',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'local-dev',
          },
        },
      },
    ]),
  ],
  controllers: [KafkaAppController],
  providers: [KafkaAppService],
})
export class KafkaAppModule {}
