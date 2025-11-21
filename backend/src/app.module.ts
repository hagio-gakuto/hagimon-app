import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RecruitYearModule } from './modules/recruit-year/recruit-year.module';
import { CustomLoggerService } from './config/custom-logger.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [RecruitYearModule],
  controllers: [],
  providers: [PrismaService, CustomLoggerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // ロガーミドルウェアをすべてのルートに適用
    consumer.apply(LoggerMiddleware).forRoutes('*');

    // 認証ミドルウェアを適用するルートを指定
    // 例: /api/protected/* のパスに認証を必須とする場合
    // import { AuthMiddleware } from './common/middleware/auth.middleware';
    // consumer.apply(AuthMiddleware).forRoutes('api/protected/*');
    // 現時点では適用しない（必要に応じて有効化）
  }
}
