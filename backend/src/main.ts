import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { CustomLoggerService } from './config/custom-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(CustomLoggerService);

  app.enableCors();
  app.useGlobalFilters(new GlobalExceptionFilter(logger));

  const port = process.env.PORT ?? 3001;
  await app.listen(port);

  logger.log(`アプリケーションがポート ${port} で起動しました`, 'Bootstrap');
}
bootstrap().catch((error) => {
  console.error('Error starting server:', error);
  process.exit(1);
});
