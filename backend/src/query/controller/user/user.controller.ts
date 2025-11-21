import { Controller, Get, Query, Param } from '@nestjs/common';
import { UserService } from '../../application/user/user.service';
import { UserListResponseDto } from '../../dto/user-list-response.dto';
import { UserResponseDto } from '../../dto/user-response.dto';
import type { UserRole, Gender } from '../../types/user.types';

const isValidUserRole = (value: string): value is UserRole => {
  return ['user', 'admin', 'master'].includes(value);
};

const isValidGender = (value: string): value is Gender => {
  return ['male', 'female', 'other'].includes(value);
};

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.findOne({ id });
  }

  @Get()
  async findMany(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('search') search?: string,
    @Query('role') role?: string,
    @Query('gender') gender?: string,
  ): Promise<UserListResponseDto> {
    return this.userService.findMany({
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
      search,
      role: role && isValidUserRole(role) ? role : undefined,
      gender: gender && isValidGender(gender) ? gender : undefined,
    });
  }
}
