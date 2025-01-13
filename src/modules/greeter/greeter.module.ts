import { Module } from '@nestjs/common';
import { GreeterService } from './greeter.service';
import { GreeterController } from './greeter.controller';

@Module({
  providers: [GreeterService],
  controllers: [GreeterController],
  exports: [GreeterService],
})
export class GreeterModule {}
