import { Environment } from '@app/common-config/Environment';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './config.service';
import { validate } from './validate';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === Environment.Development
          ? './apps/api/.env.development'
          : './apps/api/.env.test',
      ignoreEnvFile: process.env.NODE_ENV === Environment.Production,
      validate,
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
