import { ResponseEntity } from '@app/common-config/response/ResponseEntity';
import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiErrorResponse } from '../../common/decorator/api-error-response.decorator';
import { ApiSuccessResponse } from '../../common/decorator/api-success-response.decorator';
import { Auth } from '../../common/decorator/auth.decorator';
import { UserNotFoundException } from '../../common/exception/UserNotFoundException';
import { UserDto } from './dto/user.dto';
import { UserId } from './dto/userId.dto';
import { UserService } from './user.service';

@Controller('/users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  @Auth()
  @ApiSuccessResponse(HttpStatus.OK, UserDto)
  @ApiErrorResponse(UserNotFoundException)
  async get(@Param() param: UserId) {
    const user = await this.userService.findOne(param.id);

    return ResponseEntity.OK_WITH_DATA(UserDto.of(user));
  }
}
