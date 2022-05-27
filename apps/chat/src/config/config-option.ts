import { Environment } from '@app/common-config/Environment';

export const getEnvFilePath = (env: string) => {
  return env === Environment.Development
    ? './apps/chat/.env.development'
    : './apps/chat/.env.test';
};

export const getIgnoreEnvFile = (env: string) => {
  return env === Environment.Production;
};
