import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Connection } from 'typeorm';
import request from 'supertest';
import { setNestApp } from '../../../libs/common-config/src/setNestApp';
import { getRefreshToken } from '../../../libs/entity/src/domain/token/__test__/token.fixture';
import { getUser } from '../../../libs/entity/src/domain/user/__test__/user.fixture';
import { ApiAppModule } from '../src/app.module';
import { RefreshToken } from './utils/refresh-token';
import { Token } from '../../../libs/entity/src/domain/token/token.entity';
import { InvalidTokenException } from '../src/common/exception/InvalidTokenException';
import { ErrorInfo } from '../../../libs/common-config/src/exception/ErrorInfo';

describe('Auth Module E2E Test', () => {
  const route = '/v1/auth';
  let app: INestApplication;
  let connection: Connection;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiAppModule],
    }).compile();

    app = module.createNestApplication();

    setNestApp(app);

    await app.init();

    connection = app.get(Connection);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('signout', () => {
    const url = `${route}/signout`;

    test('해당하는 리프레시 토큰이 제거되고 204를 리턴하는가', async () => {
      // given
      const user = getUser();
      const em = connection.createEntityManager();

      await em.save(user);

      const refreshToken = RefreshToken.of(user);
      const refreshTokenEntity = getRefreshToken({ token: refreshToken.token, userId: user.id });
      await em.save(refreshTokenEntity);

      // when
      const res = await request(app.getHttpServer()).post(url).send({ refreshToken: refreshToken.token });

      // then
      expect(res.statusCode).toEqual(HttpStatus.NO_CONTENT);
      const savedToken = await em.findOne(Token, refreshTokenEntity.id);
      expect(savedToken).toBeUndefined();
    });

    test('해당하는 리프레시 토큰이 없으면 401을 리턴하는가', async () => {
      // given
      const user = getUser();
      const em = connection.createEntityManager();

      await em.save(user);

      const refreshToken = RefreshToken.of(user);

      // when
      const res = await request(app.getHttpServer()).post(url).send({ refreshToken: refreshToken.token });

      // then
      expect(res.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
      const errorInfo = new InvalidTokenException().getResponse() as ErrorInfo<any>;
      expect(res.body).toMatchObject({ status: errorInfo.errorCode, message: errorInfo.message });
    });
  });
});
