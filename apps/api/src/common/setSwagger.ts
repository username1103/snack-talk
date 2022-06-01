import { ResponseEntity } from '@app/common-config/response/ResponseEntity';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import expressBasicAuth from 'express-basic-auth';
import { SwaggerConfigService } from '../config/swagger/config.service';

export function setSwagger(app: INestApplication) {
  const swaggerConfigService = app.get(SwaggerConfigService);

  app.use(
    ['/v1/docs', 'v1/docs-json'],
    expressBasicAuth({
      users: { [swaggerConfigService.id]: swaggerConfigService.password },
      challenge: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('[API] RESTFul API')
    .setVersion('0.0.1')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'bearerAuth')
    .addServer('http://localhost:3000/v1', 'Local API Server')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [],
    extraModels: [ResponseEntity],
  });

  SwaggerModule.setup('/v1/docs', app, document, {
    swaggerOptions: {
      operationsSorter: (a: any, b: any) => {
        const methodsOrder = ['post', 'put', 'patch', 'get', 'delete', 'options', 'trace'];
        let result = methodsOrder.indexOf(a.get('method')) - methodsOrder.indexOf(b.get('method'));

        if (result === 0) {
          result = a.get('path').localeCompare(b.get('path'));
        }

        return result;
      },

      persistAuthorization: true,
    },
  });
}
