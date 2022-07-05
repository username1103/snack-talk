import { ApiProperty } from '@nestjs/swagger';

export class TokenResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsImlhdCI6MTY1NjkzOTc4NiwiZXhwIjoxNjU2OTQxNTg2LCJ0eXBlIjoiQUNDRVNTIn0.ADIruXVMyS_biebgShDGMzmqlUby3ii1r5vVN70jLSI',
  })
  accessToken: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsImlhdCI6MTY1NjkzOTc4NiwiZXhwIjoxNjU2OTQxNTg2LCJ0eXBlIjoiQUNDRVNTIn0.ADIruXVMyS_biebgShDGMzmqlUby3ii1r5vVN70jLSI',
  })
  refreshToken: string;

  @ApiProperty({ example: 6 })
  userId: number;

  constructor({ accessToken, refreshToken, userId }: { accessToken: string; refreshToken: string; userId: number }) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.userId = userId;
  }
}
