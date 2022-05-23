import { NestFactory } from '@nestjs/core';
import { ApiAppModule } from './app.module';
import { AppConfigService } from '@app/common-config/config/app/config.service';
import { setNestApp } from '@app/common-config/setNestApp';

async function bootstrap() {
  const app = await NestFactory.create(ApiAppModule, {
    cors: true,
    bufferLogs: true,
  });

  setNestApp(app);

  const appConfigService = app.get(AppConfigService);
  await app.listen(appConfigService.port);
}
bootstrap();
