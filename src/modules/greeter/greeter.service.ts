import { Injectable } from '@nestjs/common';

@Injectable()
export class GreeterService {
  greet(name: string): string {
    return `Hello, ${name}!`;
  }
}
