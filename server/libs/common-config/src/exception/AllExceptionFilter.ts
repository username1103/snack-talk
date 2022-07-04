import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';
import { ResponseEntity } from '../response/ResponseEntity';
import { ApiNotFoundException } from './ApiNotFoundException';
import { BadParameterException } from './BadParameterException';
import { ErrorInfo } from './ErrorInfo';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const convertedException = this.convert(exception);
    const responseEntity = this.getResponse(convertedException);
    const status = convertedException.getStatus();
    response.locals.error = instanceToPlain(convertedException.getResponse());

    if (process.env.NODE_ENV === 'development') {
      this.logger.error(exception);
    }

    response.status(status).json(instanceToPlain(responseEntity));
  }

  convert(exception: Error) {
    if (!(exception instanceof HttpException)) {
      return new InternalServerErrorException();
    }

    if (exception.constructor.name === NotFoundException.name) {
      return new ApiNotFoundException();
    }

    if (exception.constructor.name === BadRequestException.name) {
      return new BadParameterException(exception.message);
    }

    const responseBody = exception.getResponse();

    if (!(responseBody instanceof ErrorInfo)) {
      return new InternalServerErrorException();
    }

    if (!responseBody.isOperational) {
      return new InternalServerErrorException();
    }

    return exception;
  }

  getResponse(exception: HttpException) {
    if (exception instanceof InternalServerErrorException) {
      return ResponseEntity.ERROR();
    }

    const response = exception.getResponse() as ErrorInfo<any>;

    return ResponseEntity.ERROR_WITH_DATA(response.message, response.errorCode, response.data);
  }
}
