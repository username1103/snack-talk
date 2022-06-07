import { Expose } from 'class-transformer';

export class TokenPayload {
  @Expose()
  sub: number | string;

  @Expose()
  iat: number;

  @Expose()
  exp: number;

  @Expose()
  type: string;
}
