import { Environment } from '../Environment';
import { LoggerService } from './logger.serivce';

describe('Logger Service Test', () => {
  test.each([
    { env: Environment.Development, expectedValue: 'debug' },
    { env: Environment.Production, expectedValue: 'info' },
    { env: Environment.Test, expectedValue: 'error' },
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
