import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/infrastructure/prisma.service';
import { User } from '../../../domain/user/entities/user.entity';
import { IUserRepository } from '../../../domain/user/repositories/user.repository.interface';
import { UserMapper } from './user.mapper';
import { UserId } from '../../../domain/user/value-objects/user-id';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    const prismaUsers = await this.prisma.user.findMany();
    return prismaUsers.map((user) => UserMapper.toDomain(user));
  }

  async findById(id: UserId): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { id: id.toString() },
    });
    return prismaUser ? UserMapper.toDomain(prismaUser) : null;
  }
}

