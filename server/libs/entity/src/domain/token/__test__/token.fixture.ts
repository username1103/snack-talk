import { faker } from '@faker-js/faker';
import { Token } from '../token.entity';
import { TokenType } from '../type/TokenType';

export const getRefreshToken = (tokenInfo: Partial<Omit<Token, 'type'>> & { token: string; userId: number }) => {
  const token = new Token();
  token.id = tokenInfo.id || faker.datatype.number({ min: 1 });
  token.token = tokenInfo.token;
  token.userId = tokenInfo.userId;
  token.isBlackList = tokenInfo.isBlackList || false;
  token.type = TokenType.REFRESH;
  token.createdAt = tokenInfo.createdAt || new Date();
  token.updatedAt = tokenInfo.updatedAt || new Date();
  return token;
};
