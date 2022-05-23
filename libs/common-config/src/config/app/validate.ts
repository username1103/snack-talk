import { Expose, plainToClass, Type } from 'class-transformer';
import { IsEnum, IsNumber, validateSync } from 'class-validator';

export enum Enviroment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export class AppConfig {
  @Expose()
  @IsEnum(Enviroment)
  NODE_ENV: Enviroment;

  @IsNumber()
  @Expose()
  @Type(() => Number)
  PORT: number;
}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToClass(
    AppConfig,
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
