import { TokenType } from '@app/entity/domain/token/type/TokenType';
import { User } from '@app/entity/domain/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import moment from 'moment';
import { Connection } from 'typeorm';
import { DataBaseModule } from '../../config/database/database.module';
import { InvalidTokenException } from '../exception/InvalidTokenException';
import { TokenModule } from './token.module';
import { TokenService } from './token.service';

describe('Token Module Test', () => {
  let tokenService: TokenService;
  let jwtService: JwtService;
  let connection: Connection;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [DataBaseModule, TokenModule],
    }).compile();

    tokenService = module.get(TokenService);
    jwtService = module.get(JwtService);
    connection = module.get(Connection);
  });

  afterEach(async () => {
    await connection.close();
  });

  describe('generateToken', () => {
    test('토큰이 잘생성되는가', async () => {
      // given

      // when
      const token = tokenService['generateToken'](1123, moment().add(1, 'd'), TokenType.ACCESS);

      // then
      expect(token).toEqual(expect.any(String));
    });
  });

  describe('generateAuthToken', () => {
    test('유저정보에 맞는 엑세스, 리프레시토큰이 생성되는가', async () => {
      // given
      const user = new User();
      user.id = 123;

      // when
      const tokens = tokenService.generateAuthToken(user);
      // then
      await expect(tokens).resolves.toMatchObject({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
        userId: user.id,
      });
    });
  });

  describe('verifyToken', () => {
    test('확인하는 토큰과 토큰 타입이 맞는 경우 토큰페이로드가 리턴되는가', async () => {
      // given
      const token = jwtService.sign({
        sub: 123,
        iat: moment().unix(),
        exp: moment().add(1, 'd').unix(),
        type: TokenType.ACCESS.code,
      });

      // when
      const payload = tokenService.verifyToken(token, TokenType.ACCESS);

      // then
      expect(payload).toHaveProperty('sub', 123);
      expect(payload).toHaveProperty('iat', expect.any(Number));
      expect(payload).toHaveProperty('exp', expect.any(Number));
      expect(payload).toHaveProperty('type', TokenType.ACCESS.code);
    });

    test('토큰과 토큰타입이 다른 경우 InvalidTokenException이 발생하는가', async () => {
      // given
      const token = jwtService.sign({
        sub: 123,
        iat: moment().unix(),
        exp: moment().add(1, 'd').unix(),
        type: TokenType.ACCESS.code,
      });

      // when, then
      await expect(async () => {
        tokenService.verifyToken(token, TokenType.REFRESH);
      }).rejects.toThrow(new InvalidTokenException());
    });
  });
});
