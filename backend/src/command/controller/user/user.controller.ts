import { Controller, Post, Put, Body, Param } from '@nestjs/common';
import { UserService } from '../../application/user/user.service';
import type {
  CreateUserRequestDto,
  UpdateUserRequestDto,
} from '../../dto/user.dto';
import {
  createUserRequestSchema,
  updateUserRequestBodySchema,
  updateUserRequestSchema,
} from '../../dto/user.dto';
import type { BulkCreateUserRequestDto } from '../../dto/user-bulk.dto';
import { bulkCreateUserRequestSchema } from '../../dto/user-bulk.dto';
import { UserResponseDto } from '../../../query/dto/user-response.dto';
import { ZodValidationPipe } from '../../../common/pipes/zod-validation.pipe';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(createUserRequestSchema))
    dto: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    // TODO: 認証情報からuserIdを取得（現在はスタブ）
    const userId = 'system';

    return this.userService.create({
      email: dto.email,
      role: dto.role,
      firstName: dto.firstName,
      lastName: dto.lastName,
      gender: dto.gender,
      userId,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateUserRequestBodySchema))
    body: Omit<UpdateUserRequestDto, 'id'>,
  ): Promise<UserResponseDto> {
    // TODO: 認証情報からuserIdを取得（現在はスタブ）
    const userId = 'system';

    const dto: UpdateUserRequestDto = {
      id,
      ...body,
    };

    const validationPipe = new ZodValidationPipe(updateUserRequestSchema);
    const validatedDto = validationPipe.transform<UpdateUserRequestDto>(dto);

    return this.userService.update({
      id: validatedDto.id,
      email: validatedDto.email,
      role: validatedDto.role,
      firstName: validatedDto.firstName,
      lastName: validatedDto.lastName,
      gender: validatedDto.gender,
      userId,
    });
  }

  @Post('bulk')
  async bulkCreate(
    @Body(new ZodValidationPipe(bulkCreateUserRequestSchema))
    dto: BulkCreateUserRequestDto,
  ): Promise<UserResponseDto[]> {
    // TODO: 認証情報からuserIdを取得（現在はスタブ）
    const userId = 'system';

    return await this.userService.bulkCreate({
      users: dto.users,
      userId,
    });
  }
}
