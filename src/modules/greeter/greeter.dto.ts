import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator'

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
}
