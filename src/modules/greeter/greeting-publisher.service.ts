import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Greeted } from './greeted.entity';
import { Repository } from 'typeorm';
import { GreetingRequestDto } from './greeterRequest.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GreetingPublisherService {
  public constructor(
    @InjectRepository(Greeted)
    private greetedRepository: Repository<Greeted>,
    @Inject('KAFKA_SERVICE') private kafkaClient: ClientProxy,
  ) {}

  public async countGreeted(): Promise<number> {
    return await this.greetedRepository.count();
  }

  public async publishGreeting(
    greeting: string,
    param: GreetingRequestDto,
  ): Promise<void> {
    await this.greetedRepository.save(
      this.greetedRepository.create({ ...param }),
    );

    // we must await to confirm that we successfully emitted.
    await lastValueFrom(
      this.kafkaClient.emit('greeted.l0', {
        greeting,
        ...param,
      }),
    );
  }
}
