import { UserQureyRepository } from '@app/entity/domain/user/user-query.repository';
import { User } from '@app/entity/domain/user/user.entity';
import { UserModule } from '@app/entity/domain/user/user.module';
import { Test } from '@nestjs/testing';
import { Connection, getConnection } from 'typeorm';
import { getTestTypeOrmModule } from '../getTestTypeOrmModule';

describe('User Module Integration Test', () => {
  let connection: Connection;
  let userQueryRepository: UserQureyRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [getTestTypeOrmModule(), UserModule],
    }).compile();

    connection = getConnection();
    userQueryRepository = moduleRef.get(UserQureyRepository);
  });

  afterAll(async () => {
    if (connection && connection.isConnected) {
      await connection.close();
    }
  });

  test('유저정보가 잘 읽어지는가', async () => {
    // given
    const user = new User();
    user.name = 'myeongil';
    user.email = 'test@test.com';
    user.password = 'test';

    await connection.getRepository(User).save(user);

    // when
    const savedUser = await userQueryRepository.findOne(user.id);

    // then
    expect(savedUser).toMatchObject({
      id: expect.any(Number),
      name: 'myeongil',
      email: 'test@test.com',
      password: 'test',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});
