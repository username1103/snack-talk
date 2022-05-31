import moment, { Moment } from 'moment';
import { TokenType } from '@app/entity/domain/token/type/TokenType';
import { Exclude, Expose } from 'class-transformer';

export class TokenPayload {
  @Exclude()
  private readonly _sub: number;
  @Exclude()
  private readonly _iat: number;
  @Exclude()
  private readonly _exp: number;
  @Exclude()
  private readonly _type: TokenType;

  constructor({ sub, exp, type }: { sub: number; exp: Moment; type: TokenType }) {
    this._sub = sub;
    this._iat = moment().unix();
    this._exp = exp.unix();
    this._type = type;
  }

  @Expose()
  get sub() {
    return this._sub;
  }
  @Expose()
  get iat() {
    return this._iat;
  }
  @Expose()
  get exp() {
    return this._exp;
  }
  @Expose()
  get type() {
    return this._type.code;
  }

  @Exclude()
  isEquals(type: TokenType) {
    return this._type.equals(type);
  }
}
