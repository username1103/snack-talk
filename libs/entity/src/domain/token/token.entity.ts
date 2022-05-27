import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../BaseEntity';

@Entity({ name: 'token' })
export class Token extends BaseEntity {
  @Column()
  userId: number;

  @Column()
  tokenType: string;

  @Column()
  token: string;
}
