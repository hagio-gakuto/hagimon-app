import { z } from 'zod';
import type { UserRole, Gender } from '../types/user.types';

export const userExportQuerySchema = z.object({
  search: z.string().optional(),
  role: z.enum(['user', 'admin', 'master']).optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
});

export type UserExportQueryDto = {
  search?: string;
  role?: UserRole;
  gender?: Gender;
};
