import { AppConfigService } from '@app/common-config/config/app/config.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
  constructor(private readonly appConfigService: AppConfigService) {}

  getHello(): string {
    return this.appConfigService.env + this.appConfigService.port;
  }
}
