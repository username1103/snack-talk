import { TokenType } from '@app/entity/domain/token/type/TokenType';
import { User } from '@app/entity/domain/user/user.entity';
import { TokenPayload } from 'apps/api/src/common/token/type/TokenPayload';
import jwt from 'jsonwebtoken';
import moment from 'moment';

export class RefreshToken {
  private _token: string;

  private constructor(user: User) {
    const payload: TokenPayload = {
      sub: user.id,
      exp: moment().add(1, 'd').unix(),
      iat: moment().unix(),
      type: TokenType.REFRESH.code,
    };

    this._token = jwt.sign(payload, process.env.JWT_SECRET);
  }

  static of(user: User) {
    const token = new RefreshToken(user);
    return token;
  }

  get token() {
    return this._token;
  }
}
