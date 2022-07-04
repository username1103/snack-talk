import {
  ClassSerializerInterceptor,
  INestApplication,
  Logger,
  ValidationError,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import helmet from 'helmet';
import { AllExceptionFilter } from './exception/AllExceptionFilter';
import { BadParameterException } from './exception/BadParameterException';

export function setNestApp(app: INestApplication) {
  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          upgradeInsecureRequests: null,
        },
      },
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const logger = app.get(Logger);

  app.useGlobalFilters(new AllExceptionFilter(logger));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadParameterException(Object.keys(validationErrors[0].constraints).join(', '));
      },
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableShutdownHooks();
}
