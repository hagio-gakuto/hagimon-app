import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ApplicationError } from '../errors/application-error';
import { CustomLoggerService } from '../../config/custom-logger.service';

// ZodErrorの型チェック用ヘルパー関数
function isZodError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'errors' in error &&
    Array.isArray((error as { errors: unknown }).errors)
  );
}

@Catch()
@Injectable()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: CustomLoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const { method, url, ip } = request;

    // ============================================
    // ① アプリケーションエラー（ドメインやユースケースでthrowされたもの）
    // ============================================
    if (exception instanceof ApplicationError) {
      const body = exception.toResponse();
      this.logger.warn(
        `ApplicationError: ${body.message} (${body.errorCode}) - ${method} ${url} - IP: ${ip}`,
        'GlobalExceptionFilter',
      );
      response.status(exception.statusCode).json({
        ...body,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // ============================================
    // ② Zod バリデーションエラー
    // ============================================
    if (isZodError(exception)) {
      const zodError = exception as { errors: Array<{ message: string }> };
      const message = zodError.errors.map((e) => e.message).join(', ');
      this.logger.warn(
        `ValidationError: ${message} - ${method} ${url} - IP: ${ip}`,
        'GlobalExceptionFilter',
      );
      response.status(400).json({
        statusCode: 400,
        errorCode: 'VALIDATION_ERROR',
        message,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // ============================================
    // ③ その他（予期しないエラー → 500）
    // ============================================
    const error =
      exception instanceof Error ? exception : new Error(String(exception));
    const stack = error.stack || 'No stack trace available';

    this.logger.error(
      `Unexpected Error: ${error.message} - ${method} ${url} - IP: ${ip}`,
      stack,
      'GlobalExceptionFilter',
    );

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
    });
  }
}
