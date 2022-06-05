import { UserQureyRepository } from '@app/entity/domain/user/user-query.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userQueryRepository: UserQureyRepository) {}

  async findOne(id: number) {
    return 'return user';
  }
}
