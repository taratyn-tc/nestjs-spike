import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GreetingRequestDto } from './greeterRequest.dto';
import { GreetingResponseDto } from './greetingResponse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Greeted } from './greeted.entity';
import { Repository } from 'typeorm';
import { GreeterService } from './greeter.service';

@ApiTags('greeter')
@Controller({ path: 'greet' })
export class GreeterController {
  constructor(
    @InjectRepository(Greeted)
    private greetedRepository: Repository<Greeted>,
    private readonly greeterService: GreeterService,
  ) {}

  @Post()
  @ApiOkResponse({
    description: 'The greeting message',
    type: GreetingResponseDto,
  })
  public async getGreeting(
    @Body() body: GreetingRequestDto,
  ): Promise<GreetingResponseDto> {
    const greeting = this.greeterService.greet(body.name);
    await this.greetedRepository.save(
      this.greetedRepository.create({ name: body.name }),
    );

    return { greeting };
  }
}
