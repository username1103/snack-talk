import { Test, TestingModule } from '@nestjs/testing';
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
});
