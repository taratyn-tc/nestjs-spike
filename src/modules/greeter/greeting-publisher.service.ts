import { Injectable } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Greeted } from './greeted.entity';
import { Repository } from 'typeorm';
import { GreetingRequestDto } from './greeterRequest.dto';

@Injectable()
export class GreetingPublisherService {
  @Client({
    transport: Transport.KAFKA,
    options: {
      producerOnlyMode: true,
      client: {
        clientId: 'SpikeyGreeter',
        brokers: ['localhost:9092'],
      },
    },
  })
  private readonly kafkaClient: ClientKafka;

  public constructor(
    @InjectRepository(Greeted)
    private greetedRepository: Repository<Greeted>,
  ) {}

  public async publishGreeting(
    greeting: string,
    param: GreetingRequestDto,
  ): Promise<void> {
    await this.greetedRepository.save(
      this.greetedRepository.create({ ...param }),
    );
    this.kafkaClient.emit('greeted.l0', {
      greeting,
      ...param,
    });
  }
}
