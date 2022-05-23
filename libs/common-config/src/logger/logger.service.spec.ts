import { Test } from '@nestjs/testing';
import { Enviroment } from '../config/app/validate';
import { LoggerModule } from './logger.module';
import { LoggerService } from './logger.serivce';

describe('Logger Service Test', () => {
  beforeAll(async () => {
    // Enviroment 가져오기 위함
    await Test.createTestingModule({
      imports: [LoggerModule],
    }).compile();
  });

  test.each([
    { env: Enviroment.Development, expectedValue: 'debug' },
    { env: Enviroment.Production, expectedValue: 'info' },
    { env: Enviroment.Test, expectedValue: 'error' },
    { env: 'tttt', expectedValue: 'info' },
  ])(
    'NODE_ENV=$env 인경우 $expectedValue를 리턴하는가',
    async ({ env, expectedValue }) => {
      // given
      // when
      const result = LoggerService['getMaxShowingLevel'](env);

      // then
      expect(result).toEqual(expectedValue);
    },
  );
});
