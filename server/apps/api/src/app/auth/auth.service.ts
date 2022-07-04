import { UserProfile } from '@app/entity/domain/user-profile/user-profile.entity';
import { UserProfileRepository } from '@app/entity/domain/user-profile/user-profile.repository';
import { User } from '@app/entity/domain/user/user.entity';
import { UserRepository } from '@app/entity/domain/user/user.repository';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { AlreadyExistPhoneNumberException } from '../../common/exception/AlreadyExistPhoneNumberException';
import { InvalidPhoneCodeException } from '../../common/exception/InvalidPhoneCodeException';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userProfileRepository: UserProfileRepository,
    private readonly connection: Connection,
  ) {}

  sendPhoneCode(phone: string) {
    // sending

    return phone;
  }

  async register(phone: string, code: string) {
    if (!this.isValidPhoneCode(phone, code)) {
      throw new InvalidPhoneCodeException();
    }

    if (this.existsPhoneNumber(phone)) {
      throw new AlreadyExistPhoneNumberException();
    }

    const user = new User();
    user.phone = phone;

    const userProfile = new UserProfile();

    await this.connection.transaction(async (em) => {
      await em.save(user);
      userProfile.user = Promise.resolve(user);
      await em.save(userProfile);
    });

    return user;
  }

  private isValidPhoneCode(phone: string, code: string) {
    if (code !== '77777') {
      return false;
    }

    return true;
  }

  private async existsPhoneNumber(phone: string) {
    const user = await this.userRepository.findOne({ phone });
    return !!user;
  }
}
