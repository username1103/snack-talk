import { LoggerService } from '@app/common-config/logger/logger.serivce';
import { ResponseEntity } from '@app/common-config/response/ResponseEntity';
import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller()
export class ApiController {
  constructor(
    private readonly apiService: ApiService,
    private readonly loggerSerivce: LoggerService,
  ) {}

  @Get()
  getHello() {
    this.loggerSerivce.debug('debug');
    this.loggerSerivce.info('info');
    this.loggerSerivce.error('error');
    this.loggerSerivce.notice('notice');
    this.loggerSerivce.warn('warn');

    return ResponseEntity.OK_WITH_DATA(this.apiService.getHello());
  }
}
