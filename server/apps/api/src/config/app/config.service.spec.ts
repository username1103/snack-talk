import { Environment } from '@app/common-config/Environment';
import { Test } from '@nestjs/testing';
import { AppConfigModule } from './config.module';
import { AppConfigService } from './config.service';

describe('App Config Module Test', () => {
  let appConfigService: AppConfigService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [AppConfigModule],
    }).compile();

    appConfigService = app.get(AppConfigService);
  });

  describe('App Config Service Test', () => {
    test('NODE_ENV를 반환하는가', async () => {
      // given

      // when
      const env = appConfigService.env;

      // then
      expect(env).toEqual(Environment.Test);
    });

    test('PORT를 적절히 반환하는가', async () => {
      // given

      // when
      const port = appConfigService.port;

      // then
      expect(port).toEqual(parseInt(process.env.PORT, 10));
    });
  });
});
