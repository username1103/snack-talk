import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { AppConfigService } from '@app/common-config/config/app/config.service';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  const appConfigService = app.get(AppConfigService);
  await app.listen(appConfigService.port);
}
bootstrap();
