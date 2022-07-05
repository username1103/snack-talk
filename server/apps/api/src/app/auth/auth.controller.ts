import { BadParameterException } from '@app/common-config/exception/BadParameterException';
import { ResponseEntity } from '@app/common-config/response/ResponseEntity';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiErrorResponse } from '../../common/decorator/api-error-response.decorator';
import { ApiSuccessResponse } from '../../common/decorator/api-success-response.decorator';
import { InvalidPhoneCodeException } from '../../common/exception/InvalidPhoneCodeException';
import { UserNotFoundException } from '../../common/exception/UserNotFoundException';
import { TokenService } from '../../common/token/token.service';
import { AuthService } from './auth.service';
import { RegisterRequest } from './dto/register-request.dto';
import { SendPhoneCodeDto } from './dto/send-phone-code.dto';
import { TokenResponse } from './dto/token-response.dto';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly tokenService: TokenService) {}

  @Post('/phone/code')
  @ApiSuccessResponse(HttpStatus.NO_CONTENT)
  sendPhoenCode(@Body() body: SendPhoneCodeDto) {
    this.authService.sendPhoneCode(body.phone);
  }

  @Post('/register')
  @ApiSuccessResponse(HttpStatus.CREATED, TokenResponse)
  @ApiErrorResponse(InvalidPhoneCodeException)
  async register(@Body() body: RegisterRequest) {
    const user = await this.authService.register(body.phone, body.code);
    const tokens = await this.tokenService.generateAuthToken(user);

    return ResponseEntity.OK_WITH_DATA(new TokenResponse(tokens));
  }

  @Post('/login')
  @ApiSuccessResponse(HttpStatus.OK, TokenResponse)
  @ApiErrorResponse(InvalidPhoneCodeException, UserNotFoundException, BadParameterException)
  async login(@Body() body: RegisterRequest) {
    const user = await this.authService.login(body.phone, body.code);
    const tokens = await this.tokenService.generateAuthToken(user);

    return ResponseEntity.OK_WITH_DATA(new TokenResponse(tokens));
  }
}
