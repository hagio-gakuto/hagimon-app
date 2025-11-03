import { User } from '../entities/user.entity';
import { UserId } from '../value-objects/user-id';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: UserId): Promise<User | null>;
}

