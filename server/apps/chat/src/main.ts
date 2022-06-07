import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import path from 'path';
import { SocketIoAdapter } from './adapter/socket-io.adapter';
import { ChatAppModule } from './app.module';
import { AppConfigService } from './config/app/config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ChatAppModule);

  app.useWebSocketAdapter(new SocketIoAdapter(app));
  app.setBaseViewsDir(
    path.join(path.resolve(), 'apps', 'chat', 'public', 'views'),
  );
  app.setViewEngine('hbs');

  const appConfigService = app.get(AppConfigService);
  await app.listen(appConfigService.port);
}
bootstrap();
