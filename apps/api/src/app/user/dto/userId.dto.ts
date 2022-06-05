import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class UserId {
  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  id: number;
}
