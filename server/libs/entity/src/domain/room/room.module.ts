import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomQueryRepository } from './room-query.repository';
import { Room } from './room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, RoomQueryRepository])],
  exports: [TypeOrmModule],
})
export class RoomModule {}
