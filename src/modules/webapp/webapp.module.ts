import { Module } from '@nestjs/common';
import { WebappController } from './webapp.controller';
import { WebappService } from './webapp.service';

import { GreeterModule } from '../greeter/greeter.module';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceConfig } from '../../dataSourceConfig';

@Module({
  imports: [
    // the double inclusion of GreeterModule is intentional and important.
    GreeterModule,
    RouterModule.register([{ module: GreeterModule, path: 'greeter' }]),
    TypeOrmModule.forRoot(dataSourceConfig),
  ],
  controllers: [WebappController],
  providers: [WebappService],
  exports: [],
})
export class WebappModule {}
