import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../BaseEntity';

@Entity({ name: 'room' })
export class Room extends BaseEntity {
  @Column()
  defaultName: string;

  @Column()
  createdBy: number;
}
