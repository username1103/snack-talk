import { Injectable, LoggerService as ILoggerService } from '@nestjs/common';
import * as moment from 'moment';
import * as winston from 'winston';
import { AppConfigService } from '../config/app/config.service';
import { Enviroment } from '../config/app/validate';

@Injectable()
export class LoggerService implements ILoggerService {
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

  constructor(private readonly appConfigService: AppConfigService) {
    winston.addColors(LoggerService.CUSTOM_COLOR);
    this._logger = winston.createLogger({
      levels: LoggerService.CUSTOM_LEVEL,
      format: winston.format.combine(
        LoggerService.enumerateErrorFormat(),
        this.appConfigService.isDevelopment()
          ? winston.format.colorize()
          : winston.format.uncolorize(),
        winston.format.splat(),
        winston.format.printf(
          ({ level, message }) =>
            `${level}: ${moment().format('YY/MM/DD HH:mm:ss')} ${message}`,
        ),
      ),
      transports: [
        new winston.transports.Console({
          stderrLevels: ['error'],
          level: LoggerService.getMaxShowingLevel(this.appConfigService.env),
        }),
      ],
    });
  }

  private static getMaxShowingLevel(env: string) {
    switch (env) {
      case Enviroment.Development:
        return 'debug';
      case Enviroment.Production:
        return 'info';
      case Enviroment.Test:
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

  info(message: string) {
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
