import { z } from 'zod';
import type { UserRole, Gender } from '../../query/types/user.types';

const userBulkItemSchema = z.object({
  email: z.string().email('メールアドレスの形式が正しくありません'),
  firstName: z.string().min(1, '名は必須です'),
  lastName: z.string().min(1, '姓は必須です'),
  role: z.enum(['user', 'admin', 'master'], {
    errorMap: () => ({
      message: '権限はuser、admin、masterのいずれかである必要があります',
    }),
  }),
  gender: z.enum(['male', 'female', 'other']).nullable(),
});

export const bulkCreateUserRequestSchema = z.object({
  users: z.array(userBulkItemSchema).min(1, 'ユーザーは1件以上必要です'),
});

export type BulkCreateUserRequestDto = {
  users: {
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    gender: Gender | null;
  }[];
};
