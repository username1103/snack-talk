import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../BaseEntity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 30, unique: true })
  phone: string;
}
