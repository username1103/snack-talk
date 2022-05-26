import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'test' })
export class TestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
