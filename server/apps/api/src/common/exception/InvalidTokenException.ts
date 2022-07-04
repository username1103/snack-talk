import { ErrorInfo } from '@app/common-config/exception/ErrorInfo';
import { ResponseStatus } from '@app/common-config/response/ResponseStatus';
import { UnauthorizedException } from '@nestjs/common';

export class InvalidTokenException extends UnauthorizedException {
  constructor(message = '유효하지 않은 토큰입니다') {
    super(new ErrorInfo(ResponseStatus.INVALID_TOKEN, message));
  }
}
