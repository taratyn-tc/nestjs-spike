import { Injectable } from '@nestjs/common';
import { GreetingRequestDto } from './greeterRequest.dto';
import { GreeterFormality } from './GreeterFormality';

@Injectable()
export class GreeterService {
  public static getFormalityGreeting(formality: GreeterFormality): string {
    switch (formality) {
      case GreeterFormality.normal:
        return 'Hello';
      case GreeterFormality.formal:
        return 'Greetings';
      case GreeterFormality.informal:
        return 'Hiya';
    }
  }

  greet(params: GreetingRequestDto): string {
    const { name, formality } = params;
    const greeting = GreeterService.getFormalityGreeting(formality);
    return `${greeting}, ${name}!`;
  }
}
