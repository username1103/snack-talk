import { Module } from '@nestjs/common';
import { LoggerService } from './logger.serivce';

@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
