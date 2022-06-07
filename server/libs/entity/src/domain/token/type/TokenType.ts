import { ICodeName } from '@app/entity/enum/ICodeName';
import { Enum, EnumType } from 'ts-jenum';

@Enum('_code')
export class TokenType extends EnumType<TokenType>() implements ICodeName<TokenType> {
  static readonly ACCESS = new TokenType('ACCESS', '엑세스토큰');

  static readonly REFRESH = new TokenType('REFRESH', '리프레시토큰');

  constructor(private readonly _code: string, private readonly _name: string) {
    super();
  }

  get code(): string {
    return this._code;
  }

  get name(): string {
    return this._name;
  }

  equals(code: string): boolean;

  equals(v: TokenType): boolean;

  equals(v: string | TokenType) {
    let isEquals = false;

    if (v instanceof TokenType) {
      isEquals = this.code === v.code;
    } else if (typeof v === 'string') {
      isEquals = this.code === v;
    }
    return isEquals;
  }
}
