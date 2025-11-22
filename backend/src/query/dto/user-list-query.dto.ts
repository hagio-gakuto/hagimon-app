import { z } from 'zod';
import type { UserRole, Gender } from '../types/user.types';

export const userListQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined)),
  pageSize: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined)),
  search: z.string().optional(),
  role: z.enum(['user', 'admin', 'master']).optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
});

export type UserListQueryDto = {
  page?: number;
  pageSize?: number;
  search?: string;
  role?: UserRole;
  gender?: Gender;
};
