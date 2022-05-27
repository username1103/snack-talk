import { ValueTransformer } from 'typeorm';
import { TokenType } from './TokenType';

export class TokenTypeTransformer implements ValueTransformer {
  to(value: TokenType) {
    if (!value) {
      return null;
    }

    return value.enumName;
  }
  from(value: any) {
    if (!value) {
      return null;
    }

    return TokenType.valueByName(value);
  }
}
