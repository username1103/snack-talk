import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserApiService } from './user.service';

@Controller('/user')
@ApiTags('Users')
export class UserApiController {
  constructor(private readonly userApiService: UserApiService) {}
}
