"use client";

import { TextField } from "@/components/form";
import type { RecruitYearResponseDto } from "@/types/recruit-year";
import type { RecruitYearFormData } from "../hooks/useRecruitYearManagement";

type DisplayNameCellProps = {
  value: unknown;
  row: RecruitYearResponseDto;
  editingRow: RecruitYearFormData | null;
};

const DisplayNameWithForm = () => {
  return (
    <TextField
      name="displayName"
      rules={{
        required: "表示名は必須です",
        minLength: {
          value: 1,
          message: "表示名は1文字以上で入力してください",
        },
      }}
      className="w-full"
    />
  );
};

export const DisplayNameCell = ({
  value,
  row,
  editingRow,
}: DisplayNameCellProps) => {
  const year = row;
  const isEditing = editingRow?.recruitYear === year.recruitYear;
  if (isEditing) {
    return <DisplayNameWithForm />;
  }
  return <span>{String(value)}</span>;
};
