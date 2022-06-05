import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from './typeorm/config.module';
import { TypeOrmConfigService } from './typeorm/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [TypeOrmConfigModule],
      useExisting: TypeOrmConfigService,
    }),
  ],
})
export class DataBaseModule {}
