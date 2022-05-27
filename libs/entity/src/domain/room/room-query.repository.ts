import { EntityRepository, Repository } from 'typeorm';
import { Room } from './room.entity';

@EntityRepository(Room)
export class RoomQueryRepository extends Repository<Room> {}
