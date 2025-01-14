import { Module } from '@nestjs/common';
import { GreeterService } from './greeter.service';
import { GreeterController } from './greeter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Greeted } from './greeted.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Greeted])],
  providers: [GreeterService],
  controllers: [GreeterController],
  exports: [GreeterService],
})
export class GreeterModule {}
