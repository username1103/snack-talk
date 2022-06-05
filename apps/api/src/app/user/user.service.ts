import { UserQureyRepository } from '@app/entity/domain/user/user-query.repository';
import { Injectable } from '@nestjs/common';
import { UserNotFoundException } from '../../common/exception/UserNotFoundException';

@Injectable()
export class UserService {
  constructor(private readonly userQueryRepository: UserQureyRepository) {}

  async findOne(id: number) {
    const user = await this.userQueryRepository.findOne(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }
}
