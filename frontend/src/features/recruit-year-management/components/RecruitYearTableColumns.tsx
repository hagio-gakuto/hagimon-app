import type { RecruitYearResponseDto } from "@/types/recruit-year";
import type { RecruitYearFormData } from "../hooks/useRecruitYearManagement";
import { RecruitYearCell } from "./RecruitYearCell";
import { DisplayNameCell } from "./DisplayNameCell";
import { ThemeColorCell } from "./ThemeColorCell";
import { ActionsCell } from "./ActionsCell";

type ColumnProps = {
  editingRow: RecruitYearFormData | null;
  isSubmitting: boolean;
  startEdit: (year: RecruitYearResponseDto) => void;
  cancelEdit: () => void;
};

export const getTableColumns = ({
  editingRow,
  isSubmitting,
  startEdit,
  cancelEdit,
}: ColumnProps) => {
  return [
    {
      key: "recruitYear",
      label: "年度",
      render: (value: unknown, row: RecruitYearResponseDto) => (
        <RecruitYearCell value={value} row={row} editingRow={editingRow} />
      ),
    },
    {
      key: "displayName",
      label: "表示名",
      render: (value: unknown, row: RecruitYearResponseDto) => (
        <DisplayNameCell value={value} row={row} editingRow={editingRow} />
      ),
    },
    {
      key: "themeColor",
      label: "テーマカラー",
      render: (value: unknown, row: RecruitYearResponseDto) => (
        <ThemeColorCell value={value} row={row} editingRow={editingRow} />
      ),
    },
    {
      key: "actions",
      label: "操作",
      render: (value: unknown, row: RecruitYearResponseDto) => (
        <ActionsCell
          value={value}
          row={row}
          editingRow={editingRow}
          isSubmitting={isSubmitting}
          startEdit={startEdit}
          cancelEdit={cancelEdit}
        />
      ),
    },
  ];
};
