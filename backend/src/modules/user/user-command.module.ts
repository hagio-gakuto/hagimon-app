import { Module } from '@nestjs/common';
import { UserController } from '../../command/controller/user/user.controller';
import { UserService } from '../../command/application/user/user.service';
import { UserRepository } from '../../command/infra/user/user.repository';
import { UserDao } from '../../query/dao/user/user.dao';
import { PrismaService } from '../../prisma.service';
import { INJECTION_TOKENS } from '../../command/constants/injection-tokens';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: INJECTION_TOKENS.IUserRepository,
      useClass: UserRepository,
    },
    UserDao,
    PrismaService,
  ],
})
export class UserCommandModule {}
