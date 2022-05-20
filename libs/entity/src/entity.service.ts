import { Injectable } from '@nestjs/common';

@Injectable()
export class EntityService {
  hello() {
    return 'Hello Library entity';
  }
}
