import { Module } from '@nestjs/common';
import { GreeterService } from './greeter.service';
import { GreeterController } from './greeter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Greeted } from './greeted.entity';
import { GreetingPublisherService } from './greeting-publisher.service';

@Module({
  imports: [TypeOrmModule.forFeature([Greeted])],
  providers: [GreeterService, GreetingPublisherService],
  controllers: [GreeterController],
  exports: [GreeterService],
})
export class GreeterModule {}
