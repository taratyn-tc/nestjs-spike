import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty } from 'class-validator'
import { GreeterFormality } from './GreeterFormality'

/**
 * Greetings request DTO
 * @swagger
 */
export class GreetingRequestDto {
  /**
   * The name of the person to greet
   */
  @ApiProperty({ required: true })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ default: GreeterFormality.normal })
  @IsEnum(GreeterFormality)
  formality: GreeterFormality;
}
