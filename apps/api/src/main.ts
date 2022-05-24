import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ApiAppModule } from './app.module';
import { AppConfigService } from '@app/common-config/config/app/config.service';
import { setNestApp } from '@app/common-config/setNestApp';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApiAppModule, {
    cors: true,
    bufferLogs: true,
  });

  setNestApp(app);

  app.set('trust proxy', () => true);

  const appConfigService = app.get(AppConfigService);
  await app.listen(appConfigService.port);
}
bootstrap();
