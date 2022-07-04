import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiSuccessResponse } from '../../common/decorator/api-success-response.decorator';
import { AuthService } from './auth.service';
import { SendPhoneCodeDto } from './dto/send-phone-code.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/pheon/code')
  @ApiSuccessResponse(HttpStatus.NO_CONTENT)
  sendPhoenCode(@Body() body: SendPhoneCodeDto) {
    this.authService.sendPhoneCode(body.phone);
  }
}
