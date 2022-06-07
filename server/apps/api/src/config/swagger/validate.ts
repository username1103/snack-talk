import { Expose, plainToClass } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';

export class SwaggerConfig {
  @Expose()
  @IsString()
  SWAGGER_PASSWORD: string;

  @Expose()
  @IsString()
  SWAGGER_ID: string;
}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToClass(
    SwaggerConfig,
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
