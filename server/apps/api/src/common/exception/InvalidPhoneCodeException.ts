import { ErrorInfo } from '@app/common-config/exception/ErrorInfo';
import { BadRequestException } from '@nestjs/common';
import { ResponseStatus } from '../ResponseStatus';

export class InvalidPhoneCodeException extends BadRequestException {
  constructor(message = '유효하지 않은 인증 번호입니다') {
    super(new ErrorInfo(ResponseStatus.INVALID_PHONE_CODE, message));
  }
}
