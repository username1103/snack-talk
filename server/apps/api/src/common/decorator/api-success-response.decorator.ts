import { applyDecorators, HttpCode, HttpStatus, Type } from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { ResponseEntity } from '@app/common-config/response/ResponseEntity';

export function ApiSuccessResponse(status: HttpStatus, dataType: Type<any> = String) {
  class Temp extends ResponseEntity<any> {
    @ApiProperty({ type: dataType, example: dataType === String ? '' : () => dataType })
    get data() {
      return super.data;
    }
  }

  Object.defineProperty(Temp, 'name', { value: `ResponseEntity<${dataType.name}>` });

  return applyDecorators(
    HttpCode(status),
    ApiResponse({
      type: dataType && Temp,
      status,
      description: HttpStatus[status],
    }),
  );
}
