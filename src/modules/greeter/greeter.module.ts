import { Module } from '@nestjs/common';
import { GreeterService } from './greeter.service';
import { GreeterController } from './greeter.controller';
import { greetedProviders } from './greeted.provider';

@Module({
  providers: [GreeterService, ...greetedProviders],
  controllers: [GreeterController],
  exports: [GreeterService],
})
export class GreeterModule {}
