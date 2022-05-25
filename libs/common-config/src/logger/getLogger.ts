import { LoggerService } from '@nestjs/common';
import moment from 'moment';
import winston from 'winston';

const CUSTOM_LEVEL = {
  error: 0,
  warn: 1,
  notice: 1,
  info: 3,
  debug: 4,
};

const CUSTOM_COLOR = {
  error: 'red',
  warn: 'yellow',
  notice: 'blue',
  info: 'green',
  debug: 'gray',
};

const getMaxShowingLevel = (env: string) => {
  switch (env) {
    case 'development':
      return 'debug';
    case 'production':
      return 'info';
    case 'test':
      return 'error';
    default:
      return 'info';
  }
};

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

export const getLogger = (env: string, moduleName: string): LoggerService => {
  winston.addColors(CUSTOM_COLOR);
  return winston.createLogger({
    levels: CUSTOM_LEVEL,
    format: winston.format.combine(
      enumerateErrorFormat(),
      env === 'development'
        ? winston.format.colorize()
        : winston.format.uncolorize(),
      winston.format.splat(),
      winston.format.printf(
        ({ level, message }) =>
          `[${moduleName}] ${level}: ${moment().format(
            'YY/MM/DD HH:mm:ss',
          )} ${message}`,
      ),
    ),
    transports: [
      new winston.transports.Console({
        stderrLevels: ['error'],
        level: getMaxShowingLevel(env),
      }),
    ],
  });
};
