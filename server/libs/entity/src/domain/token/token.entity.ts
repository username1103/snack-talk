import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../BaseEntity';
import { TokenType } from './type/TokenType';
import { TokenTypeTransformer } from './type/TokenTypeTransformer';

@Entity({ name: 'token' })
export class Token extends BaseEntity {
  @Column()
  userId: number;

  @Column({
    type: 'varchar',
    length: 20,
    transformer: new TokenTypeTransformer(),
  })
  tokenType: TokenType;

  @Column()
  token: string;
}
