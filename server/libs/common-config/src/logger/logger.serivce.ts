import { Logger, LoggerService as ILoggerService } from '@nestjs/common';
import moment from 'moment';
import winston from 'winston';

export class LoggerService extends Logger implements ILoggerService {
  private readonly _logger: winston.Logger;

  private static CUSTOM_LEVEL = {
    error: 0,
    warn: 1,
    notice: 1,
    info: 3,
    debug: 4,
  };

  private static CUSTOM_COLOR = {
    error: 'red',
    warn: 'yellow',
    notice: 'blue',
    info: 'green',
    debug: 'gray',
  };

  constructor(env: string, moduleName: string, context?: string) {
    super(context);
    winston.addColors(LoggerService.CUSTOM_COLOR);
    this._logger = winston.createLogger({
      levels: LoggerService.CUSTOM_LEVEL,
      format: winston.format.combine(
        LoggerService.enumerateErrorFormat(),
        env === 'development'
          ? winston.format.colorize()
          : winston.format.uncolorize(),
        winston.format.splat(),
        winston.format.printf((data) => {
          console.log(data);
          const { context, level, message } = data;
          return `[${moduleName}] ${moment().format(
            'YY/MM/DD HH:mm:ss',
          )} ${level.toLocaleUpperCase()} ${context} ${message}`;
        }),
      ),
      transports: [
        new winston.transports.Console({
          stderrLevels: ['error'],
          level: LoggerService.getMaxShowingLevel(env),
        }),
      ],
    });
  }

  private static getMaxShowingLevel(env: string) {
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
  }

  private static enumerateErrorFormat = winston.format((info) => {
    if (info instanceof Error) {
      Object.assign(info, { message: info.stack });
    }
    return info;
  });

  log(message: string) {
    this._logger.info(message);
  }

  warn(message: string) {
    this._logger.warn(message);
  }

  debug(message: string) {
    this._logger.debug(message);
  }

  error(message: string) {
    this._logger.error(message);
  }

  notice(message: string) {
    this._logger.notice(message);
  }
}
