import { Module } from '@nestjs/common';
import { AppConfigModule } from '../config/app/config.module';
import { LoggerService } from './logger.serivce';

@Module({
  imports: [AppConfigModule],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
