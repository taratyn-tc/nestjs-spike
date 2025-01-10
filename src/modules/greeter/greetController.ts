import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('greeter')
@Controller({ path: 'greet' })
export class GreetController {
  constructor() {}

  @Get()
  public getGreeting() {
    return { greeting: 'foo' };
  }
}
