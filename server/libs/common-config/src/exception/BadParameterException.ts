import { BadRequestException } from '@nestjs/common';
import { ResponseStatus } from '../response/ResponseStatus';
import { ErrorInfo } from './ErrorInfo';

export class BadParameterException extends BadRequestException {
  constructor(message: string) {
    super(new ErrorInfo(ResponseStatus.BAD_PARAMETERS, message));
  }
}
