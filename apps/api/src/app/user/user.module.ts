import { UserModule } from '@app/entity/domain/user/user.module';
import { Module } from '@nestjs/common';
import { UserApiController } from './user.controller';
import { UserApiService } from './user.service';

@Module({
  imports: [UserModule],
  controllers: [UserApiController],
  providers: [UserApiService],
  exports: [],
})
export class UserApiModule {}
