import { Controller, Get, Query } from '@nestjs/common';
import { WebappService } from './webapp.service';
import { ApiTags } from '@nestjs/swagger';

const EMPTY_STRING = '';

@ApiTags('app')
@Controller()
export class WebappController {
  constructor(private readonly appService: WebappService) {}

  @Get()
  getHello(@Query('who') who: string = EMPTY_STRING): string {
    return this.appService.getHello(who);
  }
}
