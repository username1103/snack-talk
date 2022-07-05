import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MysqlConfig } from './validate';

@Injectable()
export class MysqlConfigService {
  constructor(private readonly configService: ConfigService<MysqlConfig, true>) {}

  get hostName() {
    return this.configService.get('MYSQL_HOSTNAME', { infer: true });
  }

  get userName() {
    return this.configService.get('MYSQL_USERNAME', { infer: true });
  }

  get passwrod() {
    return this.configService.get('MYSQL_PASSWORD', { infer: true });
  }

  get port() {
    return this.configService.get('MYSQL_PORT', { infer: true });
  }

  get dbName() {
    return this.configService.get('MYSQL_DATABASE', { infer: true });
  }
}
