"use client";

import { Input, ColorPicker, Button } from "@/components/ui";
import type { RecruitYearResponseDto } from "@/types/recruit-year";
import type { RecruitYearFormData } from "../hooks/useRecruitYearManagement";
import type { UseFormReturn } from "react-hook-form";

type ColumnProps = {
  editingRow: RecruitYearFormData | null;
  isSubmitting: boolean;
  startEdit: (year: RecruitYearResponseDto) => void;
  cancelEdit: () => void;
  formMethods?: UseFormReturn<RecruitYearFormData>;
};

const renderRecruitYear = (
  value: unknown,
  row: RecruitYearResponseDto,
  editingRow: RecruitYearFormData | null
) => {
  const year = row;
  const isEditing = editingRow?.recruitYear === year.recruitYear;
  if (isEditing) {
    return <span>{editingRow.recruitYear}</span>;
  }
  return <span>{String(value)}</span>;
};

const renderDisplayName = (
  value: unknown,
  row: RecruitYearResponseDto,
  editingRow: RecruitYearFormData | null,
  formMethods?: UseFormReturn<RecruitYearFormData>
) => {
  const year = row;
  const isEditing = editingRow?.recruitYear === year.recruitYear;
  if (isEditing && formMethods) {
    const { register, formState } = formMethods;
    return (
      <Input
        {...register("displayName", {
          required: "表示名は必須です",
          minLength: {
            value: 1,
            message: "表示名は1文字以上で入力してください",
          },
        })}
        error={formState.errors.displayName?.message}
        className="w-full"
      />
    );
  }
  return <span>{String(value)}</span>;
};

const renderThemeColor = (
  value: unknown,
  row: RecruitYearResponseDto,
  editingRow: RecruitYearFormData | null,
  formMethods?: UseFormReturn<RecruitYearFormData>
) => {
  const year = row;
  const isEditing = editingRow?.recruitYear === year.recruitYear;
  if (isEditing && formMethods) {
    const { register, formState, watch, setValue } = formMethods;
    const themeColor = watch("themeColor");
    return (
      <ColorPicker
        label=""
        value={themeColor || ""}
        onChange={(color) => {
          setValue("themeColor", color, { shouldValidate: true });
        }}
        error={formState.errors.themeColor?.message}
        register={register("themeColor", {
          required: "テーマカラーは必須です",
          pattern: {
            value: /^#[0-9A-Fa-f]{6}$/,
            message:
              "テーマカラーは#RRGGBB形式で入力してください（例: #1E88E5）",
          },
        })}
      />
    );
  }
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-8 h-8 rounded border border-gray-300"
        style={{ backgroundColor: String(value) }}
      />
      <span className="text-sm">{String(value)}</span>
    </div>
  );
};

const renderActions = (
  value: unknown,
  row: RecruitYearResponseDto,
  editingRow: RecruitYearFormData | null,
  isSubmitting: boolean,
  startEdit: (year: RecruitYearResponseDto) => void,
  cancelEdit: () => void
) => {
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

export const getTableColumns = ({
  editingRow,
  isSubmitting,
  startEdit,
  cancelEdit,
  formMethods,
}: ColumnProps) => {
  return [
    {
      key: "recruitYear",
      label: "年度",
      render: (value: unknown, row: RecruitYearResponseDto) =>
        renderRecruitYear(value, row, editingRow),
    },
    {
      key: "displayName",
      label: "表示名",
      render: (value: unknown, row: RecruitYearResponseDto) =>
        renderDisplayName(value, row, editingRow, formMethods),
    },
    {
      key: "themeColor",
      label: "テーマカラー",
      render: (value: unknown, row: RecruitYearResponseDto) =>
        renderThemeColor(value, row, editingRow, formMethods),
    },
    {
      key: "actions",
      label: "操作",
      render: (value: unknown, row: RecruitYearResponseDto) =>
        renderActions(
          value,
          row,
          editingRow,
          isSubmitting,
          startEdit,
          cancelEdit
        ),
    },
  ];
};
