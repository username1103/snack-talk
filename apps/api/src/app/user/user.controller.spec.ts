import { ResponseEntity } from '@app/common-config/response/ResponseEntity';
import { User } from '@app/entity/domain/user/user.entity';
import { UserModule } from '@app/entity/domain/user/user.module';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnection, getRepository } from 'typeorm';
import { UserNotFoundException } from '../../common/exception/UserNotFoundException';
import { DataBaseModule } from '../../config/database/database.module';
import { UserDto } from './dto/user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DataBaseModule, UserModule],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  afterAll(async () => {
    await getConnection().close();
  });

  describe('get', () => {
    test('해당하는 id의 유저정보를 반환하는가', async () => {
      // given
      const user = new User();
      user.name = 'tester';
      user.email = 'test@test.com';
      user.password = 'testpassword';

      await getRepository(User).save(user);
      const id = user.id;

      // when
      const result = controller.get({ id });

      // then
      await expect(result).resolves.toEqual(ResponseEntity.OK_WITH_DATA(UserDto.of(user)));
    });

    test('해당하는 id의 유저가 없으면 UserNotFoundException을 반환하는가', async () => {
      // given
      const id = 1;

      // when
      const result = controller.get({ id });

      // then
      await expect(result).rejects.toThrow(new UserNotFoundException());
    });
  });
});
