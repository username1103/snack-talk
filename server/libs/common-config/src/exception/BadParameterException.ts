import { BadRequestException } from '@nestjs/common';
import { CommonResponseStatus } from '../response/ResponseStatus';
import { ErrorInfo } from './ErrorInfo';

export class BadParameterException extends BadRequestException {
  constructor(message = '유효하지 않은 요청입니다') {
    super(new ErrorInfo(CommonResponseStatus.BAD_PARAMETERS, message));
  }
}
