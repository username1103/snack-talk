import { AppConfigModule } from '@app/common-config/config/app/config.module';
import { AppConfigService } from '@app/common-config/config/app/config.service';
import { ApiErrorLogger } from '@app/common-config/logger/ApiErrorLogger';
import { ApiSuccessLogger } from '@app/common-config/logger/ApiSuccessLogger';
import { LoggerModule } from '@app/common-config/logger/logger.module';
import { EntityModule } from '@app/entity';
import { UtilsModule } from '@app/utils';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  imports: [AppConfigModule, LoggerModule, EntityModule, UtilsModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiAppModule implements NestModule {
  constructor(private readonly appConfigService: AppConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    if (!this.appConfigService.isTest()) {
      consumer.apply(ApiSuccessLogger, ApiErrorLogger).forRoutes('*');
    }
  }
}
