import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLoggerService } from '../../config/custom-logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const startTime = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - startTime;
      const message = `${method} ${originalUrl} ${statusCode} - ${duration}ms - IP: ${ip}`;

      const logLevelMap: Record<
        string,
        { method: 'error' | 'warn' | 'log'; trace?: string }
      > = {
        error: { method: 'error', trace: undefined },
        warn: { method: 'warn' },
        log: { method: 'log' },
      };

      const getLevelFromStatusCode = (code: number): string => {
        const levelMap: Record<string, string> = {
          error: 'error',
          warn: 'warn',
          log: 'log',
        };
        if (code >= 500) return levelMap.error;
        if (code >= 400) return levelMap.warn;
        return levelMap.log;
      };

      const level = getLevelFromStatusCode(statusCode);
      const logConfig = logLevelMap[level];
      this.logger[logConfig.method](
        message,
        logConfig.trace,
        'LoggerMiddleware',
      );
    });

    next();
  }
}
