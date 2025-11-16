import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/infrastructure/prisma.service';
import { User } from '../../../domain/user/entities/user.entity';
import { IUserRepository } from '../../../domain/user/repositories/user.repository.interface';
import { UserMapper } from './user.mapper';
import { UserId } from '../../../domain/user/value-objects/user-id';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

}

