import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppConfigModule } from './config/app/config.module';
import { AppConfigService } from './config/app/config.service';
import { ApiErrorLogger } from '@app/common-config/logger/ApiErrorLogger';
import { ApiSuccessLogger } from '@app/common-config/logger/ApiSuccessLogger';
import { TypeOrmConfigModule } from './config/database/typeorm/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/database/typeorm/config.service';
import { TestModule } from '@app/entity/domain/test/test.module';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [TypeOrmConfigModule],
      useExisting: TypeOrmConfigService,
    }),
    TestModule,
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
