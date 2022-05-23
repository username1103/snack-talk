import { ResponseEntity } from '@app/common-config/response/ResponseEntity';
import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  getHello() {
    return ResponseEntity.OK_WITH_DATA(this.apiService.getHello());
  }
}
