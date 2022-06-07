import { Test } from '@nestjs/testing';
import { SwaggerConfigModule } from './config.module';
import { SwaggerConfigService } from './config.service';

describe('Swagger Config Module Test', () => {
  let swaggerConfigService: SwaggerConfigService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [SwaggerConfigModule],
    }).compile();

    swaggerConfigService = module.get(SwaggerConfigService);
  });

  describe('Swagger Config Service Test', () => {
    test('아이디가 잘 가져와 지는가', async () => {
      // given
      const id = swaggerConfigService.id;
      // when

      // then
      expect(id).toEqual(process.env.SWAGGER_ID);
    });

    test('패스워드가 잘 가져와 지는가', async () => {
      // given
      const password = swaggerConfigService.password;

      // when

      // then
      expect(password).toEqual(process.env.SWAGGER_PASSWORD);
    });
  });
});
