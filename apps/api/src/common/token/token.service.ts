import { TokenType } from '@app/entity/domain/token/type/TokenType';
import { User } from '@app/entity/domain/user/user.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import moment from 'moment';
import { JwtConfigService } from '../../config/jwt/config.service';
import { InvalidTokenException } from '../exception/InvalidTokenException';
import { TokenPayload } from './type/TokenPayload';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService, private readonly jwtConfigService: JwtConfigService) {}

  private generateToken(tokenPayload: TokenPayload) {
    return this.jwtService.sign(instanceToPlain(tokenPayload));
  }

  generateAuthToken(user: User) {
    const accessTokenExpires = moment().add(this.jwtConfigService.accessTokenExpireMinutes, 'minutes');
    const accessToken = this.generateToken(
      new TokenPayload({ sub: user.id, exp: accessTokenExpires, type: TokenType.ACCESS }),
    );

    const refreshTokenExpires = moment().add(this.jwtConfigService.refreshTokenExpireDays, 'days');
    const refreshToken = this.generateToken(
      new TokenPayload({ sub: user.id, exp: refreshTokenExpires, type: TokenType.REFRESH }),
    );

    return {
      accessToken,
      refreshToken,
      usr_id: user.id,
    };
  }

  verifyToken(token: string, tokenType: TokenType) {
    try {
      const payload = this.jwtService.verify(token);
      const convertedPayload = plainToInstance(TokenPayload, payload);

      if (!convertedPayload.isEquals(tokenType)) {
        throw new Error('Invalid Token Type');
      }

      return convertedPayload;
    } catch (e) {
      throw new InvalidTokenException();
    }
  }
}
