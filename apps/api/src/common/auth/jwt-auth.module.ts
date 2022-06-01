import { UserModule } from '@app/entity/domain/user/user.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtConfigModule } from '../../config/jwt/config.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule, UserModule, JwtConfigModule],
  providers: [JwtStrategy],
})
export class JwtAuthModule {}
