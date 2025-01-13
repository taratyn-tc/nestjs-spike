import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger';
import { GreetingRequestDto } from './greeter.dto'

@ApiTags('greeter')
@Controller({ path: 'greet' })
export class GreeterController {
  constructor() {}

  @Post()
  public getGreeting(@Body() body: GreetingRequestDto) {
    return { greeting: `Hello, ${body.name}!` };
  }
}
