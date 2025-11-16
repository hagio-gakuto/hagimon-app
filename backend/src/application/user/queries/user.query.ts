import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../shared/infrastructure/prisma.service';
import { UserResponseDto } from '../dto/user-response.dto';

@Injectable()
export class UserQuery {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<UserResponseDto[]> {
    const prismaUsers = await this.prisma.user.findMany();
    return prismaUsers.map((user) => UserResponseDto.fromPrisma(user));
  }

  async getById(id: string): Promise<UserResponseDto> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!prismaUser) {
      throw new NotFoundException('ユーザーが見つかりません');
    }

    return UserResponseDto.fromPrisma(prismaUser);
  }
}
