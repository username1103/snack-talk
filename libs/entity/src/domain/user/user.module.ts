import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserQureyRepository } from './user-query.repository';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserQureyRepository])],
  exports: [TypeOrmModule],
})
export class UserModule {}
