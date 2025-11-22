import { Injectable } from '@nestjs/common';
import { UserDao } from '../../dao/user/user.dao';
import { UserResponseDto } from '../../dto/user-response.dto';
import { UserListResponseDto } from '../../dto/user-list-response.dto';
import { NotFoundError } from '../../../common/errors/not-found.error';
import type { UserRole, Gender } from '../../types/user.types';
import { User } from '@prisma/client';

type FindManyParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  role?: UserRole;
  gender?: Gender;
};

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {}

  async findOne({ id }: { id: string }): Promise<UserResponseDto> {
    const user = await this.userDao.findOne({ id });
    if (!user) {
      throw new NotFoundError('ユーザー', id);
    }
    const {
      id: userId,
      email,
      role,
      firstName,
      lastName,
      gender,
      createdAt,
      createdBy,
      updatedAt,
      updatedBy,
    } = user;
    return new UserResponseDto({
      id: userId,
      email,
      role,
      firstName,
      lastName,
      gender,
      createdAt,
      createdBy,
      updatedAt,
      updatedBy,
    });
  }

  async findMany({
    page = 1,
    pageSize = 10,
    search,
    role,
    gender,
  }: FindManyParams): Promise<UserListResponseDto> {
    const { users, total } = await this.userDao.findMany({
      page,
      pageSize,
      search,
      role,
      gender,
    });

    const userDtos = users.map((user) => {
      const {
        id,
        email,
        role,
        firstName,
        lastName,
        gender,
        createdAt,
        createdBy,
        updatedAt,
        updatedBy,
      } = user;
      return new UserResponseDto({
        id,
        email,
        role,
        firstName,
        lastName,
        gender,
        createdAt,
        createdBy,
        updatedAt,
        updatedBy,
      });
    });

    return new UserListResponseDto({
      users: userDtos,
      total,
      page,
      pageSize,
    });
  }

  async findManyForExport({
    search,
    role,
    gender,
  }: {
    search?: string;
    role?: UserRole;
    gender?: Gender;
  }): Promise<UserResponseDto[]> {
    const users = await this.userDao.findManyForExport({
      search,
      role,
      gender,
    });

    return users.map((user: User) => {
      const {
        id,
        email,
        role: userRole,
        firstName,
        lastName,
        gender: userGender,
        createdAt,
        createdBy,
        updatedAt,
        updatedBy,
      } = user;
      return new UserResponseDto({
        id,
        email,
        role: userRole,
        firstName,
        lastName,
        gender: userGender,
        createdAt,
        createdBy,
        updatedAt,
        updatedBy,
      });
    });
  }
}
