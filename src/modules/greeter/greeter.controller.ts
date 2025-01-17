import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GreetingRequestDto } from './greeterRequest.dto';
import { GreetingResponseDto } from './greetingResponse.dto';
import { GreeterService } from './greeter.service';
import { GreetingPublisherService } from './greeting-publisher.service';

@ApiTags('greeter')
@Controller({ path: 'greet' })
export class GreeterController {
  constructor(
    private readonly greeterService: GreeterService,
    private readonly greetingPublisherService: GreetingPublisherService,
  ) {}

  @Post()
  @ApiOkResponse({
    description: 'The greeting message',
    type: GreetingResponseDto,
  })
  public async getGreeting(
    @Body() body: GreetingRequestDto,
  ): Promise<GreetingResponseDto> {
    const greeting = this.greeterService.greet(body);
    await this.greetingPublisherService.publishGreeting(greeting, body);
    return { greeting };
  }
}
