import { z } from 'zod';

export type UpdateRecruitYearRequestDto = {
  recruitYear: number;
  displayName: string;
  themeColor: string;
};

const updateRecruitYearRequestSchemaObject = {
  recruitYear: z.number().int().positive(),
  displayName: z.string().min(1, '表示名は必須です'),
  themeColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'テーマカラーは#RRGGBB形式で入力してください'),
};

export const updateRecruitYearRequestSchema = z.object(
  updateRecruitYearRequestSchemaObject,
);
