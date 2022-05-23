import { AppConfigModule } from '@app/common-config/config/app/config.module';
import { ResponseEntity } from '@app/common-config/response/ResponseEntity';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

describe('ApiController', () => {
  let apiController: ApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppConfigModule],
      controllers: [ApiController],
      providers: [ApiService],
    }).compile();

    apiController = app.get<ApiController>(ApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(apiController.getHello()).toEqual(
        ResponseEntity.OK_WITH_DATA(process.env.NODE_ENV + process.env.PORT),
      );
    });
  });
});
