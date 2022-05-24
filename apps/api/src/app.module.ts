import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppConfigModule } from '@app/common-config/config/app/config.module';
import { AppConfigService } from '@app/common-config/config/app/config.service';
import { ApiErrorLogger } from '@app/common-config/logger/ApiErrorLogger';
import { ApiSuccessLogger } from '@app/common-config/logger/ApiSuccessLogger';

@Module({
  imports: [AppConfigModule],
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
