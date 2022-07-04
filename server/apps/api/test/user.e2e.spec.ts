import { CommonResponseStatus } from '@app/common-config/response/ResponseStatus';
import { setNestApp } from '@app/common-config/setNestApp';
import { User } from '@app/entity/domain/user/user.entity';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { getConnection, getRepository } from 'typeorm';
import { ApiAppModule } from '../src/app.module';
import { ResponseStatus } from '../src/common/ResponseStatus';
import { AccessToken } from './utils/token';

describe('User Api Module E2E Test', () => {
  let app: INestApplication;
  let server;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiAppModule],
    }).compile();

    app = module.createNestApplication();
    setNestApp(app);

    await app.init();

    server = app.getHttpServer();
  });

  afterAll(async () => {
    await getConnection().close();
  });

  describe('GET /v1/users/:id', () => {
    const url = (id: number) => `/v1/users/${id}`;

    test('해당하는 유저정보가 조회되는가', async () => {
      // given
      const user = new User();
      user.name = 'tester';
      user.email = 'test@test.com';
      user.password = 'testpassword';

      await getRepository(User).save(user);

      // when
      const res = await request(server)
        .get(url(user.id))
        .set({ Authorization: AccessToken.of(user).bearerForm })
        .send()
        .expect(HttpStatus.OK);

      // then

      expect(res.body).toMatchObject({
        status: CommonResponseStatus.OK,
        message: '',
        data: {
          id: expect.any(Number),
          name: 'tester',
          email: 'test@test.com',
        },
      });
    });

    test('해당하는 유저정보가 없으면 UserNotFoundException에러가 발생하는가', async () => {
      // given
      const user = new User();
      user.name = 'tester002';
      user.email = 'test@test.com';
      user.password = 'testpassword';

      await getRepository(User).save(user);

      // when
      const res = await request(server)
        .get(url(user.id + 1))
        .set({ Authorization: AccessToken.of(user).bearerForm })
        .send();

      // then
      expect(res.body).toMatchObject({
        status: ResponseStatus.USER_NOT_FOUND,
        message: '해당하는 유저가 존재하지 않습니다',
      });
    });
  });
});
