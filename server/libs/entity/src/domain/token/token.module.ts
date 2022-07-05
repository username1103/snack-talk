import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenRepository } from './token.repository';
import { Token } from './token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Token, TokenRepository])],
  exports: [TypeOrmModule],
})
export class TokenModule {}
