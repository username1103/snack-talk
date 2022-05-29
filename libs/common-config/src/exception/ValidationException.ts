import { BadRequestException } from '@nestjs/common';
import { ResponseStatus } from '../response/ResponseStatus';
import { ErrorInfo } from './ErrorInfo';

export class ValidationException extends BadRequestException {
  constructor(message: string) {
    super(new ErrorInfo(ResponseStatus.INVALID_INPUT, message));
  }
}
