import { Injectable } from '@nestjs/common';

const DEFAULT_TO_GREET = 'World';

@Injectable()
export class WebappService {
  getHello(who: string = DEFAULT_TO_GREET): string {
    if (who === '') {
      who = DEFAULT_TO_GREET;
    }
    return `Hello ${who}!`;
  }
}
