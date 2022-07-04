import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiErrorResponse } from '../../common/decorator/api-error-response.decorator';
import { ApiSuccessResponse } from '../../common/decorator/api-success-response.decorator';
import { InvalidPhoneCodeException } from '../../common/exception/InvalidPhoneCodeException';
import { AuthService } from './auth.service';
import { SendPhoneCodeDto } from './dto/send-phone-code.dto';
import { VerifyPhoneCodeDto } from './dto/verify-phone-code.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/phone/code')
  @ApiSuccessResponse(HttpStatus.NO_CONTENT)
  sendPhoenCode(@Body() body: SendPhoneCodeDto) {
    this.authService.sendPhoneCode(body.phone);
  }

  @Post('/phone')
  @ApiErrorResponse(InvalidPhoneCodeException)
  @ApiSuccessResponse(HttpStatus.NO_CONTENT)
  verifyPhoneCode(@Body() body: VerifyPhoneCodeDto) {
    this.authService.verifyPhoneCode(body.phone, body.code);
  }
}
