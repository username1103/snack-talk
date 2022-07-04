import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ApiAppModule } from './app.module';
import { AppConfigService } from './config/app/config.service';
import { setNestApp } from '@app/common-config/setNestApp';
import { WinstonModule } from 'nest-winston';
import { getLogger } from '@app/common-config/logger/getLogger';
import { setSwagger } from './common/setSwagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApiAppModule, {
    cors: true,
    logger: WinstonModule.createLogger(getLogger('API')),
  });

  setSwagger(app);

  setNestApp(app);

  app.set('trust proxy', () => true);

  const appConfigService = app.get(AppConfigService);
  await app.listen(appConfigService.port);
}

bootstrap();
