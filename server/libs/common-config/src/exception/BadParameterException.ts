import { BadRequestException } from '@nestjs/common';
import { ResponseStatus } from '../response/ResponseStatus';
import { ErrorInfo } from './ErrorInfo';

export class BadParameterException extends BadRequestException {
  constructor(message = '유효하지 않은 요청입니다') {
    super(new ErrorInfo(ResponseStatus.BAD_PARAMETERS, message));
  }
}
