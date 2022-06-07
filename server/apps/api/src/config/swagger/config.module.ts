import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getEnvFilePath, getIgnoreEnvFile } from '../config-option';
import { SwaggerConfigService } from './config.service';
import { validate } from './validate';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvFilePath(process.env.NODE_ENV),
      ignoreEnvFile: getIgnoreEnvFile(process.env.NODE_ENV),
      validate,
    }),
  ],
  providers: [SwaggerConfigService],
  exports: [SwaggerConfigService],
})
export class SwaggerConfigModule {}
