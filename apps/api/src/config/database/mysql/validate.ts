import { Expose, plainToClass } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

export class MysqlConfig {
  @Expose()
  @IsString()
  MYSQL_HOSTNAME: string;

  @Expose()
  @IsString()
  MYSQL_USERNAME: string;

  @Expose()
  @IsString()
  MYSQL_PASSWORD: string;

  @Expose()
  @IsNumber()
  MYSQL_PORT: number;

  @Expose()
  @IsString()
  MYSQL_DATABASE: string;
}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToClass(
    MysqlConfig,
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
