import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '../../../application/user/use-cases/user.service';
import type { UserResponseDto } from '../../../application/user/dto/user-response.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<UserResponseDto[]> {
    const users = await this.userService.getUsers();
    return users.map((user) => user.toDTO());
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.userService.getUserById(id);
    return user.toDTO();
  }
}

