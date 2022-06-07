import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../BaseEntity';
import { NotificationStatus } from './type/NotificationStatus';
import { NotificationStatusTransformer } from './type/NotificationStatusTransformer';

@Entity({ name: 'user_room' })
export class UserRoom extends BaseEntity {
  @Column()
  room_name: string;

  @Column({
    type: 'varchar',
    length: 10,
    transformer: new NotificationStatusTransformer(),
  })
  notificationStatus: NotificationStatus;

  @Column()
  userId: number;

  @Column()
  roomId: number;
}
