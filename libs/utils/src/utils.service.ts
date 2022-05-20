import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  hello() {
    return 'Hello Library util';
  }
}
