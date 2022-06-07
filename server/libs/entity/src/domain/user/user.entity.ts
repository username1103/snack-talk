import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../BaseEntity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 200 })
  password: string;
}
