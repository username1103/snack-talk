import { Environment } from '@app/common-config/Environment';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './validate';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService<AppConfig, true>) {}

  get env() {
    return this.configService.get('NODE_ENV', { infer: true });
  }

  get port() {
    return this.configService.get('PORT', { infer: true });
  }

  isDevelopment() {
    return this.env === Environment.Development;
  }

  isTest() {
    return this.env === Environment.Test;
  }

  isProduction() {
    return this.env === Environment.Production;
  }
}
