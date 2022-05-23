import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ApiAppModule } from '../src/app.module';
import { setNestApp } from '@app/common-config/setNestApp';

describe('ApiController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiAppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setNestApp(app);
    await app.init();
  });

  it('/v1 (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/v1')
      .expect(HttpStatus.OK);

    expect(res.body).toEqual({
      data: process.env.NODE_ENV + process.env.PORT,
      message: '',
      status: 'OK',
    });
  });
});
