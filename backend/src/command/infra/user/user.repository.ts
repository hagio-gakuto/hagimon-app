import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { User } from '@prisma/client';
import { IUserRepository } from '../../domain/user/user.repository.interface';
import { UserEntity } from '../../domain/user/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: UserEntity): Promise<User> {
    return await this.prisma.user.create({
      data: {
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        createdBy: user.createdBy,
        updatedBy: user.updatedBy,
      },
    });
  }

  async update(user: UserEntity): Promise<User> {
    return await this.prisma.user.update({
      where: { id: user.id! },
      data: {
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        updatedBy: user.updatedBy,
      },
    });
  }
}
