import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategy';
import path from 'path';

export const getTestTypeOrmModule = () => {
  const envPath = path.resolve(__dirname, './src/domain/**/*.entity.{ts,js}');
  return TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'admin',
    database: 'toy-nestjs-test',
    autoLoadEntities: true,
    synchronize: true,
    entities: [envPath],
    namingStrategy: new SnakeNamingStrategy(),
    toRetry: () => false,
  });
};
