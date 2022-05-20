import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonConfigService {
  hello() {
    return 'Hello Library common-config';
  }
}
