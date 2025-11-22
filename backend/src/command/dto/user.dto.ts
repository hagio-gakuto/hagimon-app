import { z } from 'zod';
import type { UserRole, Gender } from '../../query/types/user.types';

export type CreateUserRequestDto = {
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  gender: Gender | null;
};

export type UpdateUserRequestDto = {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  gender: Gender | null;
};

const userRequestSchemaObject = {
  email: z.string().email('メールアドレスの形式が正しくありません'),
  role: z.enum(['user', 'admin', 'master'], {
    errorMap: () => ({
      message: '権限はuser、admin、masterのいずれかである必要があります',
    }),
  }),
  firstName: z.string().min(1, '名は必須です'),
  lastName: z.string().min(1, '姓は必須です'),
  gender: z.enum(['male', 'female', 'other']).nullable(),
};

export const createUserRequestSchema = z.object(userRequestSchemaObject);

export const updateUserRequestBodySchema = z.object(userRequestSchemaObject);

export const updateUserRequestSchema = z.object({
  id: z.string().min(1, 'ユーザーIDは必須です'),
  ...userRequestSchemaObject,
});
