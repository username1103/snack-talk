import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './config.service';
import { validate } from './validate';

@Module({
  imports: [ConfigModule.forRoot({ ignoreEnvFile: true, validate })],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
