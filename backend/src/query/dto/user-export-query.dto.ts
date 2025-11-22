import { z } from 'zod';
import type { UserRole, Gender } from '../types/user.types';

export const userExportQuerySchema = z.object({
  id: z.string().optional(),
  search: z.string().optional(),
  role: z.enum(['user', 'admin', 'master']).optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
});

export type UserExportQueryDto = {
  id?: string;
  search?: string;
  role?: UserRole;
  gender?: Gender;
};
