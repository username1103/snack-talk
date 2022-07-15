import { TokenType } from '@app/entity/domain/token/type/TokenType';
import { User } from '@app/entity/domain/user/user.entity';
import { TokenPayload } from 'apps/api/src/common/token/type/TokenPayload';
import jwt from 'jsonwebtoken';
import moment from 'moment';

export class AccessToken {
  private _token: string;

  private constructor(user: User) {
    const payload: TokenPayload = {
      sub: user.id,
      exp: moment().add(1, 'd').unix(),
      iat: moment().unix(),
      type: TokenType.ACCESS.code,
    };

    this._token = jwt.sign(payload, process.env.JWT_SECRET);
  }

  static of(user: User) {
    const token = new AccessToken(user);
    return token;
  }

  get bearerForm() {
    return `bearer ${this._token}`;
  }
}
