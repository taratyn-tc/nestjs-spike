import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GreeterModule } from './modules/greeter/greeter.module';
import { RouterModule } from '@nestjs/core';

export const prefixedGreeterModule = RouterModule.register([
  { module: GreeterModule, path: 'greeter' },
]);

@Module({
  imports: [GreeterModule, prefixedGreeterModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
