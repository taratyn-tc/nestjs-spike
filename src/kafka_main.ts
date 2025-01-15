import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KafkaAppModule } from './modules/kafkaApp/kafka-app.module';

const bootstrap = async () => {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    KafkaAppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
      },
    },
  );
  await app.listen();
};

bootstrap();
