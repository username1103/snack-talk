import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoomQueryRepository } from './user-room-query.repository';
import { UserRoom } from './user-room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRoom, UserRoomQueryRepository])],
  exports: [TypeOrmModule],
})
export class UserRoomModule {}
