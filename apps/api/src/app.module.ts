import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppConfigModule } from '@app/common-config/config/app/config.module';
import { AppConfigService } from '@app/common-config/config/app/config.service';
import { ApiErrorLogger } from '@app/common-config/logger/ApiErrorLogger';
import { ApiSuccessLogger } from '@app/common-config/logger/ApiSuccessLogger';
import { Enviroment } from '@app/common-config/config/app/validate';

@Module({
  imports: [
    AppConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === Enviroment.Development
          ? './apps/api/.env.development'
          : './apps/api/.env.test',
      ignoreEnvFile: process.env.NODE_ENV === Enviroment.Production,
    }),
  ],
  controllers: [],
  providers: [Logger],
  exports: [Logger],
})
export class ApiAppModule implements NestModule {
  constructor(private readonly appConfigService: AppConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    if (!this.appConfigService.isTest()) {
      consumer.apply(ApiSuccessLogger, ApiErrorLogger).forRoutes('*');
    }
  }
}
