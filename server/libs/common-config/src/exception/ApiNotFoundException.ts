import { NotFoundException } from '@nestjs/common';
import { ResponseStatus } from '../response/ResponseStatus';
import { ErrorInfo } from './ErrorInfo';

export class ApiNotFoundException extends NotFoundException {
  constructor() {
    super(new ErrorInfo(ResponseStatus.API_NOT_FOUND, '해당하는 API가 존재하지 않습니다'));
  }
}
