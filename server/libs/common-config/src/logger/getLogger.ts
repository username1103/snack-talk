import moment from 'moment';
import winston from 'winston';
import { ApiErrorLogger } from './ApiErrorLogger';

const CUSTOM_LEVEL = {
  error: 0,
  warn: 2,
  notice: 3,
  info: 4,
  debug: 5,
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

export const getLogger = (env: string, moduleName: string): winston.LoggerOptions => {
  winston.addColors(CUSTOM_COLOR);
  return {
    levels: CUSTOM_LEVEL,
    format: winston.format.combine(
      env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
      winston.format.printf(({ context, level, stack, message }) => {
        return [
          `[${moduleName}]`,
          moment().format('YY/MM/DD HH:mm:ss'),
          level,
          context ? `[${context}]` : '',
          context === ApiErrorLogger.name ? message : stack || message,
        ].join(' ');
      }),
    ),
    transports: [
      new winston.transports.Console({
        stderrLevels: ['error'],
        level: getMaxShowingLevel(env),
      }),
    ],
  };
};
