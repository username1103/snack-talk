import { Enviroment } from '../config/app/validate';
import { LoggerService } from './logger.serivce';

describe('Logger Service Test', () => {
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
