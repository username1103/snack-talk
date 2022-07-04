import { NotFoundException } from '@nestjs/common';
import { CommonResponseStatus } from '../response/ResponseStatus';
import { ErrorInfo } from './ErrorInfo';

export class ApiNotFoundException extends NotFoundException {
  constructor(message = '해당하는 API가 존재하지 않습니다') {
    super(new ErrorInfo(CommonResponseStatus.API_NOT_FOUND, message));
  }
}
