import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './user-profile.entity';
import { UserProfileRepository } from './user-profile.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile, UserProfileRepository])],
  exports: [TypeOrmModule],
})
export class UserProfileModule {}
