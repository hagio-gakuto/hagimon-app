import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from '../../application/user/user.service';
import { UserDao } from '../../dao/user/user.dao';
import { PrismaService } from '../../../prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserDao, PrismaService],
})
export class UserQueryModule {}
