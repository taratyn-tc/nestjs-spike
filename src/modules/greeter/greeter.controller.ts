import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GreetingRequestDto } from './greeterRequest.dto';
import { GreetingResponseDto } from './greetingResponse.dto';

@ApiTags('greeter')
@Controller({ path: 'greet' })
export class GreeterController {
  constructor() {}

  @Post()
  @ApiOkResponse({
    description: 'The greeting message',
    // schema: GreetingResponseDto,
    type: GreetingResponseDto,
  })
  public getGreeting(@Body() body: GreetingRequestDto): GreetingResponseDto {
    return { greeting: `Hello, ${body.name}!` };
  }
}
