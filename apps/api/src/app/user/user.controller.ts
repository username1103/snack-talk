import { ResponseEntity } from '@app/common-config/response/ResponseEntity';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async get(@Param('id') id: number) {
    const user = await this.userService.findOne(id);

    return ResponseEntity.OK_WITH_DATA(user);
  }
}
