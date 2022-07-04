import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class SendPhoneCodeDto {
  @ApiProperty({ example: '01050568216' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{11}$/)
  phone: string;
}
