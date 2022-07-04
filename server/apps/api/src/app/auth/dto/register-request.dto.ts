import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class RegisterRequest {
  @ApiProperty({ example: '01050568216' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{11}$/)
  phone: string;

  @ApiProperty({ example: '77777' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{5}$/)
  code: string;
}
