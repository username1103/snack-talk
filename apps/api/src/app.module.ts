import { AppConfigModule } from '@app/common-config/config/app/config.module';
import { LoggerModule } from '@app/common-config/logger/logger.module';
import { EntityModule } from '@app/entity';
import { UtilsModule } from '@app/utils';
import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  imports: [AppConfigModule, LoggerModule, EntityModule, UtilsModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiAppModule {}
