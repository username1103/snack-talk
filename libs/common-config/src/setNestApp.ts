import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationError,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import helmet from 'helmet';
import { AllExceptionFilter } from './exception/AllExceptionFilter';
import { ValidationException } from './exception/ValidationException';

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

  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new ValidationException(
          `Invalid value, property: ${validationErrors[0].property}, value: ${validationErrors[0].value}`,
        );
      },
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableShutdownHooks();
}
