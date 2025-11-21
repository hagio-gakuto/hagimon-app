"use client";

import type { RecruitYearResponseDto } from "@/types/recruit-year";
import type { RecruitYearFormData } from "../hooks/useRecruitYearManagement";

type RecruitYearCellProps = {
  value: unknown;
  row: RecruitYearResponseDto;
  editingRow: RecruitYearFormData | null;
};

export const RecruitYearCell = ({
  value,
  row,
  editingRow,
}: RecruitYearCellProps) => {
  const year = row;
  const isEditing = editingRow?.recruitYear === year.recruitYear;
  if (isEditing) {
    return <span>{editingRow.recruitYear}</span>;
  }
  return <span>{String(value)}</span>;
};

