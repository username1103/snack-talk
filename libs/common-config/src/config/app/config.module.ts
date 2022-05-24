import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './config.service';
import { validate } from './validate';

@Module({})
export class AppConfigModule {
  static forRoot({
    envFilePath,
    ignoreEnvFile,
  }: {
    envFilePath: string;
    ignoreEnvFile: boolean;
  }): DynamicModule {
    return {
      global: true,
      module: AppConfigModule,
      imports: [ConfigModule.forRoot({ envFilePath, ignoreEnvFile, validate })],
      providers: [AppConfigService],
      exports: [AppConfigService],
    };
  }
}
