import { UserRepository } from '@app/entity/domain/user/user.repository';
import { User } from '@app/entity/domain/user/user.entity';
import { UserModule } from '@app/entity/domain/user/user.module';
import { Test } from '@nestjs/testing';
import { Connection, getConnection } from 'typeorm';
import { getTestTypeOrmModule } from '../getTestTypeOrmModule';

describe('User Module Integration Test', () => {
  let connection: Connection;
  let userQueryRepository: UserRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [getTestTypeOrmModule(), UserModule],
    }).compile();

    connection = getConnection();
    userQueryRepository = moduleRef.get(UserRepository);
  });

  afterAll(async () => {
    if (connection && connection.isConnected) {
      await connection.close();
    }
  });

  test('유저정보가 잘 읽어지는가', async () => {
    // given
    const user = new User();
    user.phone = '01050568216';

    await connection.getRepository(User).save(user);

    // when
    const savedUser = await userQueryRepository.findOne(user.id);

    // then
    expect(savedUser).toMatchObject({
      id: expect.any(Number),
      phone: '01050568216',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});
