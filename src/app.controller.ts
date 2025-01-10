import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

const EMPTY_STRING = '';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query('who') who: string = EMPTY_STRING): string {
    return this.appService.getHello(who);
  }
}
