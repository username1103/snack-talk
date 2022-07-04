import { Test, TestingModule } from '@nestjs/testing';
import { InvalidPhoneCodeException } from '../../common/exception/InvalidPhoneCodeException';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('sendPhoneCode', () => {
    test('정의되어 있는가', async () => {
      // given
      // when
      // then
      expect(service.sendPhoneCode).toBeDefined();
    });
  });

  describe('verifyPhoneCode', () => {
    test('인증코드가 77777인경우 true를 리턴하는가', async () => {
      // given
      const phone = '01050568216';
      const code = '77777';
      // when
      const isVerified = service.verifyPhoneCode(phone, code);
      // then
      expect(isVerified).toEqual(true);
    });

    test('인증코드가 77777이 아닌 경우 InvalidPhoneCodeException이 발생하는가', async () => {
      // given
      const phone = '01050568216';
      const code = '12345';
      // when
      const result = new Promise((res) => {
        res(service.verifyPhoneCode(phone, code));
      });
      // then
      await expect(result).rejects.toThrow(InvalidPhoneCodeException);
    });
  });
});
