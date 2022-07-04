import { Injectable } from '@nestjs/common';
import { InvalidPhoneCodeException } from '../../common/exception/InvalidPhoneCodeException';

@Injectable()
export class AuthService {
  sendPhoneCode(phone: string) {
    // sending

    return phone;
  }

  verifyPhoneCode(phone: string, code: string) {
    if (code !== '77777') {
      throw new InvalidPhoneCodeException();
    }

    return true;
  }
}
