import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('greeter')
@Controller({ path: 'greeter' })
export class GreeterController {
  constructor() {}

  @Get()
  public getGreeting() {
    return 'foo';
  }
}
