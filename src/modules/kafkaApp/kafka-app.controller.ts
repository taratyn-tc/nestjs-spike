import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class KafkaAppController {
  @EventPattern('greeted.l0')
  async handleGreeted(@Payload() data: unknown, @Ctx() context: KafkaContext) {
    console.log('Greeted:', { data, context });
    // be careful here as we could block the heartbeat
  }
}
