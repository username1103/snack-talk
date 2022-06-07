import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerConfig } from './validate';

@Injectable()
export class SwaggerConfigService {
  constructor(private readonly configService: ConfigService<SwaggerConfig, true>) {}

  get id() {
    return this.configService.get('SWAGGER_ID', { infer: true });
  }

  get password() {
    return this.configService.get('SWAGGER_PASSWORD', { infer: true });
  }
}
