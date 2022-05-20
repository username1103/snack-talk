import { Module } from '@nestjs/common';
import { CommonConfigService } from './common-config.service';

@Module({
  providers: [CommonConfigService],
  exports: [CommonConfigService],
})
export class CommonConfigModule {}
