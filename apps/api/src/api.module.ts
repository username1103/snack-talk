import { AppConfigModule } from '@app/common-config/config/app/config.module';
import { EntityModule } from '@app/entity';
import { UtilsModule } from '@app/utils';
import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  imports: [AppConfigModule, EntityModule, UtilsModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
