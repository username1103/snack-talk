import { ResponseEntity } from '@app/common-config/response/ResponseEntity';
import { applyDecorators, HttpCode, HttpStatus, Type } from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';

export function ApiSuccessResponse(status: number, data?: Type<any>) {
  class Temp extends ResponseEntity<any> {
    @ApiProperty({ type: data })
    get data() {
      return super.data;
    }
  }
  return applyDecorators(HttpCode(status), ApiResponse({ type: data && Temp, status, description: HttpStatus[status] }));
}
