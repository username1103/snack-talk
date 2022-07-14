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
  type: TokenType;

  @Column()
  token: string;

  @Column({ default: false })
  isBlackList: boolean;

  static of(token: string, type: TokenType, userId: number) {
    const tokenEntity = new Token();
    tokenEntity.token = token;
    tokenEntity.type = type;
    tokenEntity.userId = userId;
    return tokenEntity;
  }
}
