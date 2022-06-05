import { ErrorInfo } from '@app/common-config/exception/ErrorInfo';
import { ResponseStatus } from '@app/common-config/response/ResponseStatus';
import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super(new ErrorInfo(ResponseStatus.USER_NOT_FOUND, '해당하는 유저가 존재하지 않습니다'));
  }
}
