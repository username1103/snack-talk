import { Token } from '@app/entity/domain/token/token.entity';
import { TokenRepository } from '@app/entity/domain/token/token.repository';
import { TokenType } from '@app/entity/domain/token/type/TokenType';
import { User } from '@app/entity/domain/user/user.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import moment, { Moment } from 'moment';
import { JwtConfigService } from '../../config/jwt/config.service';
import { InvalidTokenException } from '../exception/InvalidTokenException';
import { TokenPayload } from './type/TokenPayload';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly jwtConfigService: JwtConfigService,
    private readonly tokenRepository: TokenRepository,
  ) {}

  private generateToken(sub: number, exp: Moment, type: TokenType) {
    const payload: TokenPayload = {
      sub,
      iat: moment().unix(),
      exp: exp.unix(),
      type: type.code,
    };
    return this.jwtService.sign(payload);
  }

  async generateAuthToken(user: User) {
    const accessTokenExpires = moment().add(this.jwtConfigService.accessTokenExpireMinutes, 'minutes');
    const accessToken = this.generateToken(user.id, accessTokenExpires, TokenType.ACCESS);

    const refreshTokenExpires = moment().add(this.jwtConfigService.refreshTokenExpireDays, 'days');
    const refreshToken = this.generateToken(user.id, refreshTokenExpires, TokenType.REFRESH);

    const token = Token.of(refreshToken, TokenType.REFRESH, user.id);
    await this.tokenRepository.save(token);

    return {
      accessToken,
      refreshToken,
      userId: user.id,
    };
  }

  async verifyRefreshToken(token: string) {
    const payload = this.verifyToken(token, TokenType.REFRESH);

    const tokenEntity = await this.tokenRepository.findOne({
      where: { token: token, userId: payload.sub, type: TokenType.REFRESH },
    });

    if (!tokenEntity) {
      throw new InvalidTokenException();
    }

    return tokenEntity;
  }

  async deleteById(tokenId: number) {
    await this.tokenRepository.delete({ id: tokenId });
  }

  private verifyToken(token: string, tokenType: TokenType) {
    try {
      const payload = this.jwtService.verify(token);
      const convertedPaylaod = plainToInstance(TokenPayload, payload);

      if (!tokenType.equals(convertedPaylaod.type)) {
        throw new Error('Invalid Token Type');
      }

      return convertedPaylaod;
    } catch (e) {
      throw new InvalidTokenException();
    }
  }
}
