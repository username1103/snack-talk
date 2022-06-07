import { Module } from '@nestjs/common';
import { AppConfigModule } from '../../app/config.module';
import { MysqlConfigModule } from '../mysql/config.module';
import { TypeOrmConfigService } from './config.service';

@Module({
  imports: [MysqlConfigModule, AppConfigModule],
  providers: [TypeOrmConfigService],
  exports: [TypeOrmConfigService],
})
export class TypeOrmConfigModule {}
