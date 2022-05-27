import { TestEntity } from '@app/entity/domain/test/test.entity';
import { TestModule } from '@app/entity/domain/test/test.module';
import { Test } from '@nestjs/testing';
import { Connection, getConnection, Repository } from 'typeorm';
import { getTestTypeOrmModule } from '../getTestTypeOrmModule';

describe('Test Module Integration Test', () => {
  let connection: Connection;
  let testRepository: Repository<TestEntity>;

  beforeAll(async () => {
    await Test.createTestingModule({
      imports: [getTestTypeOrmModule(), TestModule],
    }).compile();

    connection = getConnection();
    testRepository = connection.getRepository(TestEntity);
  });

  afterAll(async () => {
    if (connection && connection.isConnected) {
      await connection.close();
    }
  });

  test('insert Test Entity', async () => {
    // given
    const entity = new TestEntity();
    entity.name = 'test';

    // when
    await testRepository.save(entity);

    // then
    expect(entity.id).toBeDefined();
  });
});
