import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigModule } from '../../config/jwt/config.module';
import { JwtConfigService } from '../../config/jwt/config.service';
import { TokenService } from './token.service';
import { TokenModule as TokenEntityModule } from '@app/entity/domain/token/token.module';

@Module({
  imports: [
    JwtConfigModule,
    JwtModule.registerAsync({
      imports: [JwtConfigModule],
      useFactory: async (jwtConfigService: JwtConfigService) => ({
        secret: jwtConfigService.secret,
      }),
      inject: [JwtConfigService],
    }),
    TokenEntityModule,
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
