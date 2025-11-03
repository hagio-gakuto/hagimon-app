import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '../../../application/user/use-cases/user.service';
import type { UserDto } from '../../../application/user/dto/user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  async getUsers(): Promise<UserDto[]> {
    const users = await this.userService.getUsers();
    return users.map((user) => user.toDTO());
  }

  @Get('users/:id')
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    const user = await this.userService.getUserById(id);
    return user.toDTO();
  }
}

