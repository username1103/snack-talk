import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { TokenType } from '@app/entity/domain/token/type/TokenType';
import { UserQureyRepository } from '@app/entity/domain/user/user-query.repository';
import { JwtConfigService } from '../../config/jwt/config.service';
import { TokenPayload } from '../token/type/TokenPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userQueryRepository: UserQureyRepository, jwtConfigService: JwtConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfigService.secret,
    });
  }

  async validate(payload: TokenPayload) {
    try {
      const tokenType = TokenType.valueOf(payload.type);

      if (!tokenType.equals(TokenType.ACCESS)) {
        throw new Error('Invalid Token Type');
      }

      if (!payload.sub) {
        throw new Error('Invalid sub');
      }

      const user = this.userQueryRepository.findOne(payload.sub);

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (e) {
      throw new Error(`Invalid Token: ${e.message}`);
    }
  }
}
