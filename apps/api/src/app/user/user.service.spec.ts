import { Test } from '@nestjs/testing';
import { User } from '@app/entity/domain/user/user.entity';
import { Connection, getConnection } from 'typeorm';
import { UserService } from './user.service';
import { DataBaseModule } from '../../config/database/database.module';
import { UserModule } from '@app/entity/domain/user/user.module';
import { UserNotFoundException } from '../../common/exception/UserNotFoundException';

describe('UserService', () => {
  let sut: UserService;
  let connection: Connection;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [DataBaseModule, UserModule],
      providers: [UserService],
    }).compile();

    sut = module.get(UserService);
    connection = getConnection();
  });

  afterEach(async () => {
    await connection.getRepository(User).delete({});
  });

  afterAll(async () => {
    await connection.close();
  });

  describe('findOne', () => {
    test('해당하는 id의 유저정보를 가져오는가', async () => {
      // given
      const user = new User();
      user.name = 'testname';
      user.password = 'testpassword';
      user.email = 'test@test.com';

      await connection.getRepository(User).save(user);
      // when
      const result = sut.findOne(user.id);

      // then
      await expect(result).resolves.toMatchObject({
        id: expect.any(Number),
        name: 'testname',
        password: 'testpassword',
        email: 'test@test.com',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    test('해당하는 id의 쥬저정보가 없으면 UserNotFoundException이 발생하는가', async () => {
      // given
      // when
      const result = sut.findOne(1);

      // then
      await expect(result).rejects.toThrow(new UserNotFoundException());
    });
  });
});
