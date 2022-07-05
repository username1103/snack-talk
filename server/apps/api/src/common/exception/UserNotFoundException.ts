import { ErrorInfo } from '@app/common-config/exception/ErrorInfo';
import { NotFoundException } from '@nestjs/common';
import { ResponseStatus } from '../ResponseStatus';

export class UserNotFoundException extends NotFoundException {
  constructor(message = '해당하는 유저가 존재하지 않습니다') {
    super(new ErrorInfo(ResponseStatus.USER_NOT_FOUND, message));
  }
}
