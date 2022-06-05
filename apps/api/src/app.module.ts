import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppConfigModule } from './config/app/config.module';
import { AppConfigService } from './config/app/config.service';
import { ApiErrorLogger } from '@app/common-config/logger/ApiErrorLogger';
import { ApiSuccessLogger } from '@app/common-config/logger/ApiSuccessLogger';
import { JwtAuthModule } from './common/auth/jwt-auth.module';
import { SwaggerConfigModule } from './config/swagger/config.module';
import { DataBaseModule } from './config/database/database.module';
import { UserApiModule } from './app/user/user.module';

@Module({
  imports: [AppConfigModule, DataBaseModule, JwtAuthModule, SwaggerConfigModule, UserApiModule],
  controllers: [],
  providers: [Logger],
})
export class ApiAppModule implements NestModule {
  constructor(private readonly appConfigService: AppConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    if (!this.appConfigService.isTest()) {
      consumer.apply(ApiSuccessLogger, ApiErrorLogger).forRoutes('*');
    }
  }
}
