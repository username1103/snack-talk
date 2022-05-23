import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ApiAppModule } from '../src/app.module';
import { ResponseEntity } from '@app/common-config/response/ResponseEntity';

describe('ApiController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiAppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/').expect(200);

    expect(res.body).toEqual(
      ResponseEntity.OK_WITH_DATA(process.env.NODE_ENV + process.env.PORT),
    );
  });
});
