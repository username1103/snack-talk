import { UserModule } from '@app/entity/domain/user/user.module';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'typeorm';
import { TokenModule } from '../../../common/token/token.module';
import { DataBaseModule } from '../../../config/database/database.module';
import { AuthService } from '../auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, DataBaseModule, TokenModule],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    connection = module.get(Connection);
  });

  afterEach(async () => {
    await connection.close();
  });

  describe('register', () => {
    test('해당하는 번호의 생성된 유저를 리턴하는가', async () => {
      // given
      const phone = '01050568216';
      const code = '77777';

      // when
      const result = service.register(phone, code);
      // then
      await expect(result).resolves.toMatchObject({
        userId: expect.any(Number),
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      });
    });
  });
});
