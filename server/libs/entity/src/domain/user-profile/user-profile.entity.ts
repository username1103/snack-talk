import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../BaseEntity';
import { User } from '../user/user.entity';

@Entity('user_profile')
export class UserProfile extends BaseEntity {
  @Column({ type: 'varchar', default: '' })
  nickname: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: Promise<User>;
}
