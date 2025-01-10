import { Module } from '@nestjs/common';
import { GreeterService } from './greeter.service';
import { GreetController } from './greetController';

@Module({
  providers: [GreeterService],
  controllers: [GreetController],
  exports: [GreeterService],
})
export class GreeterModule {}
