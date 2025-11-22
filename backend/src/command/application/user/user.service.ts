import { Injectable, Inject } from '@nestjs/common';
import type { IUserRepository } from '../../domain/user/user.repository.interface';
import { UserEntity } from '../../domain/user/user.entity';
import { UserResponseDto } from '../../../query/dto/user-response.dto';
import { UserDao } from '../../../query/dao/user/user.dao';
import { INJECTION_TOKENS } from '../../constants/injection-tokens';
import type { UserRole, Gender } from '../../../query/types/user.types';

type CreateParams = {
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  gender: Gender | null;
  userId: string;
};

type UpdateParams = {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  gender: Gender | null;
  userId: string;
};

type BulkCreateParams = {
  users: {
    email: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    gender: Gender | null;
  }[];
  userId: string;
};

@Injectable()
export class UserService {
  constructor(
    @Inject(INJECTION_TOKENS.IUserRepository)
    private readonly userRepository: IUserRepository,
    private readonly userDao: UserDao,
  ) {}

  async create(params: CreateParams): Promise<UserResponseDto> {
    const userEntity = new UserEntity({
      email: params.email,
      role: params.role,
      firstName: params.firstName,
      lastName: params.lastName,
      gender: params.gender,
      createdBy: params.userId,
      updatedBy: params.userId,
    });
    const created = await this.userRepository.create(userEntity);
    return this.toResponseDto(created);
  }

  async update(params: UpdateParams): Promise<UserResponseDto> {
    const userEntity = new UserEntity({
      id: params.id,
      email: params.email,
      role: params.role,
      firstName: params.firstName,
      lastName: params.lastName,
      gender: params.gender,
      createdBy: '',
      updatedBy: params.userId,
    });
    const updated = await this.userRepository.update(userEntity);
    return this.toResponseDto(updated);
  }

  async bulkCreate(params: BulkCreateParams): Promise<UserResponseDto[]> {
    const createdUsers = await Promise.all(
      params.users.map((userData) => {
        const userEntity = new UserEntity({
          email: userData.email,
          role: userData.role,
          firstName: userData.firstName,
          lastName: userData.lastName,
          gender: userData.gender,
          createdBy: params.userId,
          updatedBy: params.userId,
        });
        return this.userRepository.create(userEntity);
      }),
    );
    return createdUsers.map((user) => this.toResponseDto(user));
  }

  private toResponseDto(user: {
    id: string;
    email: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    gender: Gender | null;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
  }): UserResponseDto {
    return new UserResponseDto({
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      createdAt: user.createdAt,
      createdBy: user.createdBy,
      updatedAt: user.updatedAt,
      updatedBy: user.updatedBy,
    });
  }
}
