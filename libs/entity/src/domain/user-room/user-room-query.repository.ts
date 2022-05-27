import { EntityRepository, Repository } from 'typeorm';
import { UserRoom } from './user-room.entity';

@EntityRepository(UserRoom)
export class UserRoomQueryRepository extends Repository<UserRoom> {}
