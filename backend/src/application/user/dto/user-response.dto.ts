import { User as PrismaUser } from '@prisma/client';

export type UserResponseDto = {
  id: string;
  name: string;
  age: number;
  hobby: string;
  imageUrl: string | null;
  introduction: string | null;
};

export const UserResponseDto = {
  fromPrisma(user: PrismaUser): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      age: user.age,
      hobby: user.hobby,
      imageUrl: user.imageUrl,
      introduction: user.introduction,
    };
  },
};

