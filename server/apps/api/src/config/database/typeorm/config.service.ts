import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import path from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategy';
import { AppConfigService } from '../../app/config.service';
import { MysqlConfigService } from '../mysql/config.service';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    private readonly mysqlConfigService: MysqlConfigService,
    private readonly appConfigService: AppConfigService,
  ) {}

  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    const entityPath = path.resolve(__dirname, '../../../../../../libs/entity/src/**/*.entity.{js,ts}');
    return {
      type: 'mysql',
      name: connectionName,
      host: this.mysqlConfigService.hostName,
      port: this.mysqlConfigService.port,
      username: this.mysqlConfigService.userName,
      password: this.mysqlConfigService.passwrod,
      database: this.mysqlConfigService.dbName,
      logging: this.appConfigService.isDevelopment() ? 'all' : ['error', 'warn'],
      entities: [entityPath],
      synchronize: !this.appConfigService.isProduction(),
      namingStrategy: new SnakeNamingStrategy(),
      dropSchema: this.appConfigService.isTest(),
      timezone: '+00:00',
    };
  }
}
