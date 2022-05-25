import morgan from 'morgan';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
// import { LoggerService } from './logger.serivce';

@Injectable()
export class ApiSuccessLogger implements NestMiddleware {
  private readonly successResponseFormat = `client: :client - :method :url :status - :response-time ms\ndata: :data`;

  constructor(private readonly logger: Logger) {
    morgan.token(
      'message',
      (_: Request, res: Response) =>
        (res.locals.error && res.locals.error.message) || '',
    );

    morgan.token('client', (req: Request) => req.ip);

    morgan.token('data', (req: Request, res: Response) =>
      JSON.stringify({
        method: req.method,
        baseUrl: req.headers.host,
        url: req.originalUrl,
        auth: req.headers.authorization || 'No tokens',
        body: req.body || {},
        params: req.params || {},
        query: req.query || {},
        error: res.locals.error,
      }),
    );
  }

  use(req: Request, res: Response, next: (error?: any) => void) {
    morgan(this.successResponseFormat, {
      skip: (_req: Request, _res: Response) => _res.statusCode >= 400,
      stream: { write: (message) => this.logger.log(message.trim()) },
    })(req, res, next);
  }
}
