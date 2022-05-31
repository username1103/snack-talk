import { Expose, plainToClass } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

export class JwtConfig {
  @Expose()
  @IsString()
  JWT_SECRET: string;

  @Expose()
  @IsNumber()
  JWT_ACCESS_EXPIRATION_MINUTES: number;

  @Expose()
  @IsNumber()
  JWT_REFRESH_EXPIRATION_DAYS: number;
}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToClass(
    JwtConfig,
    { ...config },
    { enableImplicitConversion: true, excludeExtraneousValues: true },
  );

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
};
