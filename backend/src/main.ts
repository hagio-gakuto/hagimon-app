import { NestFactory } from '@nestjs/core';
import { UserModule } from './interface/http/user/user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap().catch((error) => {
  console.error('Error starting server:', error);
  process.exit(1);
});
