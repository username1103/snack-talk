import { setNestApp } from '@app/common-config/setNestApp';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { ApiAppModule } from '../src/app.module';
import { setSwagger } from '../src/common/setSwagger';

describe('Swagger Docs E2E Test', () => {
  let app: INestApplication;
  let server;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiAppModule],
    }).compile();

    app = module.createNestApplication();

    setSwagger(app);

    setNestApp(app);

    await app.init();

    server = app.getHttpServer();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /v1/docs', () => {
    const url = '/v1/docs';
    test('비밀번호 입력전 명세 페이지 접속이 불가능한가', async () => {
      // given, when, then
      await request(server).get(url).expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('GET /v1/docs-json', () => {
    const url = '/v1/docs-json';
    test('비밀번호 입력전 명세 JSON 페이지 접속이 불가능한가', async () => {
      // given, when, then
      await request(server).get(url).expect(HttpStatus.UNAUTHORIZED);
    });
  });
});
