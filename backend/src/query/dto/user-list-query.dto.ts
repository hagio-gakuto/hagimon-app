import { z } from 'zod';
import type { UserRole, Gender } from '../types/user.types';

export const userListQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined))
    .refine(
      (val) => val === undefined || (Number.isInteger(val) && val > 0),
      'pageは1以上の整数である必要があります',
    ),
  pageSize: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined))
    .refine(
      (val) => val === undefined || (Number.isInteger(val) && val > 0),
      'pageSizeは1以上の整数である必要があります',
    ),
  id: z.string().optional(),
  search: z.string().optional(),
  role: z.enum(['user', 'admin', 'master']).optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
});

export type UserListQueryDto = {
  page?: number;
  pageSize?: number;
  id?: string;
  search?: string;
  role?: UserRole;
  gender?: Gender;
};
