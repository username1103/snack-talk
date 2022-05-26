import { Environment } from '@app/common-config/Environment';

export const getEnvFilePath = (env: string) => {
  return env === Environment.Development
    ? './apps/api/.env.development'
    : './apps/api/.env.test';
};

export const getIgnoreEnvFile = (env: string) => {
  return env === Environment.Production;
};
