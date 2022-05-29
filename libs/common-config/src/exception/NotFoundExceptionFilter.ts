import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from '@nestjs/common';
import { NextFunction } from 'express';
import { ApiNotFoundException } from './ApiNotFoundException';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const next = ctx.getNext<NextFunction>();

    next(new ApiNotFoundException());
  }
}
