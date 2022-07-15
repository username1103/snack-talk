import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class SignoutRequestDto {
  @ApiProperty({
    type: 'string',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsImlhdCI6MTY1NjkzOTc4NiwiZXhwIjoxNjU2OTQxNTg2LCJ0eXBlIjoiQUNDRVNTIn0.ADIruXVMyS_biebgShDGMzmqlUby3ii1r5vVN70jLSI',
  })
  @IsJWT()
  refreshToken: string;
}
