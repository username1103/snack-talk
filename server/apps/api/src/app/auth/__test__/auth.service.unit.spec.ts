import { Connection } from 'typeorm';
import { mock, instance } from 'ts-mockito';
import { UserRepository } from '../../../../../../libs/entity/src/domain/user/user.repository';
import { TokenService } from '../../../common/token/token.service';
import { AuthService } from '../auth.service';

describe('Auth Service Unit Test', () => {
  let authService: AuthService;
  let tokenService: TokenService;
  let connection: Connection;
  let userRepository: UserRepository;

  describe('sendPhoneCode', () => {
    test('정의되어 있는가', async () => {
      // given
      tokenService = mock(TokenService);
      connection = mock(Connection);
      userRepository = mock(UserRepository);

      authService = new AuthService(instance(userRepository), instance(tokenService), instance(connection));

      // when
      // then
      expect(authService.sendPhoneCode).toBeDefined();
    });
  });

  describe('isValidPhoneCode', () => {
    test('인증코드가 77777인경우 true를 리턴하는가', async () => {
      // given
      const phone = '01050568216';
      const code = '77777';

      tokenService = mock(TokenService);
      connection = mock(Connection);
      userRepository = mock(UserRepository);

      authService = new AuthService(instance(userRepository), instance(tokenService), instance(connection));

      // when
      const isVerified = authService['isValidPhoneCode'](phone, code);
      // then
      expect(isVerified).toEqual(true);
    });

    test('인증코드가 77777이 아닌 경우 false를 리턴하는가', async () => {
      // given
      const phone = '01050568216';
      const code = '12345';

      tokenService = mock(TokenService);
      connection = mock(Connection);
      userRepository = mock(UserRepository);

      authService = new AuthService(instance(userRepository), instance(tokenService), instance(connection));
      // when
      const isVerified = authService['isValidPhoneCode'](phone, code);
      // then
      expect(isVerified).toEqual(false);
    });
  });
});
