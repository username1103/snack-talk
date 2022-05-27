import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../BaseEntity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  nickname: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
