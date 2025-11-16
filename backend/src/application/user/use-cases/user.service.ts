import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { IUserRepository } from '../../../domain/user/repositories/user.repository.interface';
import { USER_REPOSITORY } from '../../../domain/user/repositories/user.repository.interface';
import { User } from '../../../domain/user/entities/user.entity';
import { UserId } from '../../../domain/user/value-objects/user-id';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

}

