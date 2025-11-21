import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class CustomLoggerService implements LoggerService {
  log(message: string, context?: string) {
    const contextStr = context ? `[${context}]` : '';
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] LOG ${contextStr} ${message}`);
  }

  error(message: string, trace?: string, context?: string) {
    const contextStr = context ? `[${context}]` : '';
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ERROR ${contextStr} ${message}`);
    if (trace) {
      console.error(`[${timestamp}] STACK ${contextStr}`, trace);
    }
  }

  warn(message: string, context?: string) {
    const contextStr = context ? `[${context}]` : '';
    const timestamp = new Date().toISOString();
    console.warn(`[${timestamp}] WARN ${contextStr} ${message}`);
  }

  debug(message: string, context?: string) {
    const contextStr = context ? `[${context}]` : '';
    const timestamp = new Date().toISOString();
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[${timestamp}] DEBUG ${contextStr} ${message}`);
    }
  }

  verbose(message: string, context?: string) {
    const contextStr = context ? `[${context}]` : '';
    const timestamp = new Date().toISOString();
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${timestamp}] VERBOSE ${contextStr} ${message}`);
    }
  }
}
