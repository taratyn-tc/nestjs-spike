import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class GreetingResponseDto {
  /**
   * The greeting message
   */
  @ApiProperty({ required: true })
  @Length(1)
  greeting: string;
}
