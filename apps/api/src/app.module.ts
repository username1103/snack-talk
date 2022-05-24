import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppConfigModule } from '@app/common-config/config/app/config.module';
import { AppConfigService } from '@app/common-config/config/app/config.service';
import { ApiErrorLogger } from '@app/common-config/logger/ApiErrorLogger';
import { ApiSuccessLogger } from '@app/common-config/logger/ApiSuccessLogger';
import { Enviroment } from '@app/common-config/config/app/validate';
import { LoggerModule } from '@app/common-config/logger/logger.module';

@Module({
  imports: [
    AppConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === Enviroment.Development
          ? './apps/api/.env.development'
          : './apps/api/.env.test',
      ignoreEnvFile: process.env.NODE_ENV === Enviroment.Production,
    }),
    LoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiAppModule implements NestModule {
  constructor(private readonly appConfigService: AppConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    if (!this.appConfigService.isTest()) {
      consumer.apply(ApiSuccessLogger, ApiErrorLogger).forRoutes('*');
    }
  }
}
