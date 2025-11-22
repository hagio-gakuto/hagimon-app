import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { User, Prisma } from '@prisma/client';
import type { UserRole, Gender } from '../../types/user.types';

type UserWithRelations = User;

type FindManyParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  role?: UserRole;
  gender?: Gender;
};

@Injectable()
export class UserDao {
  constructor(private readonly prisma: PrismaService) {}

  async findOne({ id }: { id: string }): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findMany({
    page = 1,
    pageSize = 10,
    search,
    role,
    gender,
  }: FindManyParams): Promise<{
    users: UserWithRelations[];
    total: number;
  }> {
    const skip = (page - 1) * pageSize;
    const where: Prisma.UserWhereInput = {};

    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (role) {
      where.role = role;
    }

    if (gender) {
      where.gender = gender;
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return { users, total };
  }

  async findManyForExport({
    search,
    role,
    gender,
  }: {
    search?: string;
    role?: UserRole;
    gender?: Gender;
  }): Promise<User[]> {
    const where: Prisma.UserWhereInput = {};

    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (role) {
      where.role = role;
    }

    if (gender) {
      where.gender = gender;
    }

    return this.prisma.user.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
