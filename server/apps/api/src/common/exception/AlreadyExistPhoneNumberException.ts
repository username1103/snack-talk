import { ErrorInfo } from '@app/common-config/exception/ErrorInfo';
import { BadRequestException } from '@nestjs/common';
import { ResponseStatus } from '../ResponseStatus';

export class AlreadyExistPhoneNumberException extends BadRequestException {
  constructor(message = '이미 존재하는 휴대폰 번호입니다') {
    super(new ErrorInfo(ResponseStatus.INVALID_PHONE_CODE, message));
  }
}
