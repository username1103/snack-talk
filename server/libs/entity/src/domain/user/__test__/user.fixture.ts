import { User } from '../user.entity';
import { faker } from '@faker-js/faker';

export const getUser = (userInfo: Partial<User> = {}) => {
  const user = new User();
  user.id = userInfo.id || faker.datatype.number({ min: 1 });
  user.phone = userInfo.phone || faker.phone.number('010########');
  user.createdAt = userInfo.createdAt || new Date();
  user.updatedAt = userInfo.updatedAt || new Date();
  return user;
};
