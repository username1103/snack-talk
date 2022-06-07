import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenQueryRepository } from './token-query.repository';
import { Token } from './token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Token, TokenQueryRepository])],
  exports: [TypeOrmModule],
})
export class TokenModule {}
