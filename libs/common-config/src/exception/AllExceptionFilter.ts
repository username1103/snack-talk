import { ArgumentsHost, Catch, ExceptionFilter, HttpException, InternalServerErrorException } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';
import { ResponseEntity } from '../response/ResponseEntity';
import { ErrorInfo } from './ErrorInfo';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    exception = this.convert(exception);
    const responseEntity = this.getResponse(exception);
    const status = exception.getStatus();

    response.status(status).json(instanceToPlain(responseEntity));
  }

  convert(exception: Error) {
    if (!(exception instanceof HttpException)) {
      return new InternalServerErrorException();
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
