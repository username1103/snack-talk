import { UserProfile } from '@app/entity/domain/user-profile/user-profile.entity';
import { User } from '@app/entity/domain/user/user.entity';
import { UserRepository } from '@app/entity/domain/user/user.repository';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TokenRepository } from '../../../../../libs/entity/src/domain/token/token.repository';
import { AlreadyExistPhoneNumberException } from '../../common/exception/AlreadyExistPhoneNumberException';
import { InvalidPhoneCodeException } from '../../common/exception/InvalidPhoneCodeException';
import { InvalidTokenException } from '../../common/exception/InvalidTokenException';
import { UserNotFoundException } from '../../common/exception/UserNotFoundException';
import { TokenService } from '../../common/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly tokenService: TokenService,
    private readonly connection: Connection,
  ) {}

  sendPhoneCode(phone: string) {
    // sending

    return phone;
  }

  async signup(phone: string, code: string) {
    if (!this.isValidPhoneCode(phone, code)) {
      throw new InvalidPhoneCodeException();
    }

    if (await this.existsPhoneNumber(phone)) {
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

    const tokens = await this.tokenService.generateAuthToken(user);
    return tokens;
  }

  async signin(phone: string, code: string) {
    if (!this.isValidPhoneCode(phone, code)) {
      throw new InvalidPhoneCodeException();
    }

    const user = await this.userRepository.findOne({ phone });
    if (!user) {
      throw new UserNotFoundException();
    }

    const tokens = await this.tokenService.generateAuthToken(user);

    return tokens;
  }

  async signout(token: string) {
    const tokenEntity = await this.tokenService.decodeRefreshToken(token);

    await this.tokenRepository.deleteById(tokenEntity.id);
  }

  async refreshTokens(token: string) {
    const tokenEntity = await this.tokenService.verifyRefreshToken(token);

    const user = await this.userRepository.findOne(tokenEntity.userId);
    if (!user) {
      throw new InvalidTokenException();
    }

    await this.tokenRepository.deleteById(tokenEntity.id);

    const tokens = await this.tokenService.generateAuthToken(user);

    return tokens;
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
