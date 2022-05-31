import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from './validate';

@Injectable()
export class JwtConfigService {
  constructor(private readonly configService: ConfigService<JwtConfig, true>) {}

  get secret() {
    return this.configService.get('JWT_SECRET', { infer: true });
  }

  get accessTokenExpireMinutes() {
    return this.configService.get('JWT_ACCESS_EXPIRATION_MINUTES', {
      infer: true,
    });
  }

  get refreshTokenExpireDays() {
    return this.configService.get('JWT_REFRESH_EXPIRATION_DAYS', {
      infer: true,
    });
  }
}
