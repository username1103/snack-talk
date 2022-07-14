import { BadParameterException } from '@app/common-config/exception/BadParameterException';
import { ResponseEntity } from '@app/common-config/response/ResponseEntity';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiErrorResponse } from '../../common/decorator/api-error-response.decorator';
import { ApiSuccessResponse } from '../../common/decorator/api-success-response.decorator';
import { InvalidPhoneCodeException } from '../../common/exception/InvalidPhoneCodeException';
import { InvalidTokenException } from '../../common/exception/InvalidTokenException';
import { UserNotFoundException } from '../../common/exception/UserNotFoundException';
import { AuthService } from './auth.service';
import { RefreshAuthTokenRequestDto } from './dto/refresh-auth-token-request.dto';
import { RegisterRequest } from './dto/register-request.dto';
import { SendPhoneCodeDto } from './dto/send-phone-code.dto';
import { TokenResponse } from './dto/token-response.dto';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/phone/code')
  @ApiSuccessResponse(HttpStatus.NO_CONTENT)
  sendPhoenCode(@Body() body: SendPhoneCodeDto) {
    this.authService.sendPhoneCode(body.phone);
  }

  @Post('/signup')
  @ApiSuccessResponse(HttpStatus.CREATED, TokenResponse)
  @ApiErrorResponse(InvalidPhoneCodeException)
  async signup(@Body() body: RegisterRequest) {
    const tokens = await this.authService.signup(body.phone, body.code);

    return ResponseEntity.OK_WITH_DATA(new TokenResponse(tokens));
  }

  @Post('/signin')
  @ApiSuccessResponse(HttpStatus.OK, TokenResponse)
  @ApiErrorResponse(InvalidPhoneCodeException, UserNotFoundException, BadParameterException)
  async signin(@Body() body: RegisterRequest) {
    const tokens = await this.authService.signin(body.phone, body.code);

    return ResponseEntity.OK_WITH_DATA(new TokenResponse(tokens));
  }

  @Post('/refresh-tokens')
  @ApiSuccessResponse(HttpStatus.OK, TokenResponse)
  @ApiErrorResponse(InvalidTokenException)
  async refreshAuthToken(@Body() body: RefreshAuthTokenRequestDto) {
    const tokens = await this.authService.refreshTokens(body.refreshToken);

    return ResponseEntity.OK_WITH_DATA(new TokenResponse(tokens));
  }
}
