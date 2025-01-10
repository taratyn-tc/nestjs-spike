import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GreeterModule } from './modules/greeter/greeter.module';

@Module({
  imports: [GreeterModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
