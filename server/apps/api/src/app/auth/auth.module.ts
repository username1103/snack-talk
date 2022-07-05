import { UserModule } from '@app/entity/domain/user/user.module';
import { Module } from '@nestjs/common';
import { TokenModule } from '../../common/token/token.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthApiModule {}
