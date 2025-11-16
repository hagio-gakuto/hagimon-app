import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserQuery } from '../../../application/user/queries/user.query';
import { UserRepository } from '../../../infrastructure/prisma/user/user.repository';
import { IUserRepository, USER_REPOSITORY } from '../../../domain/user/repositories/user.repository.interface';
import { PrismaService } from '../../../shared/infrastructure/prisma.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserQuery,
    PrismaService,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}

