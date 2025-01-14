import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GreeterModule } from './modules/greeter/greeter.module';
import { RouterModule } from '@nestjs/core';
import { databaseProviders } from './modules/database/database.providers';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    // the double inclusion of GreeterModule is intentional and important.
    GreeterModule,
    RouterModule.register([{ module: GreeterModule, path: 'greeter' }]),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
