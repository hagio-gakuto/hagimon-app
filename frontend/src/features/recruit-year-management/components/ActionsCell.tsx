"use client";

import { Button } from "@/components/ui";
import type { RecruitYearResponseDto } from "@/types/recruit-year";
import type { RecruitYearFormData } from "../hooks/useRecruitYearManagement";

type ActionsCellProps = {
  value: unknown;
  row: RecruitYearResponseDto;
  editingRow: RecruitYearFormData | null;
  isSubmitting: boolean;
  startEdit: (year: RecruitYearResponseDto) => void;
  cancelEdit: () => void;
};

export const ActionsCell = ({
  value: _value,
  row,
  editingRow,
  isSubmitting,
  startEdit,
  cancelEdit,
}: ActionsCellProps) => {
  const year = row;
  const isEditing = editingRow?.recruitYear === year.recruitYear;
  if (isEditing) {
    return (
      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={isSubmitting}>
          {isSubmitting ? "保存中..." : "保存"}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={cancelEdit}
          disabled={isSubmitting}
        >
          キャンセル
        </Button>
      </div>
    );
  }
  return (
    <Button size="sm" variant="outline" onClick={() => startEdit(year)}>
      編集
    </Button>
  );
};
