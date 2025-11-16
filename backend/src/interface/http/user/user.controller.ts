import { Controller, Get, Param } from '@nestjs/common';
import { UserQuery } from '../../../application/user/queries/user.query';
import type { UserResponseDto } from '../../../application/user/dto/user-response.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userQuery: UserQuery) {}

  @Get()
  async getUsers(): Promise<UserResponseDto[]> {
    return this.userQuery.getAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userQuery.getById(id);
  }
}

