"use client";

import { ColorPicker } from "@/components/ui";
import { useFormContext } from "react-hook-form";
import type { RecruitYearResponseDto } from "@/types/recruit-year";
import type { RecruitYearFormData } from "../hooks/useRecruitYearManagement";

type ThemeColorCellProps = {
  value: unknown;
  row: RecruitYearResponseDto;
  editingRow: RecruitYearFormData | null;
};

const ThemeColorWithForm = () => {
  const { register, formState, watch, setValue } =
    useFormContext<RecruitYearFormData>();
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
          message: "テーマカラーは#RRGGBB形式で入力してください（例: #1E88E5）",
        },
      })}
    />
  );
};

export const ThemeColorCell = ({
  value,
  row,
  editingRow,
}: ThemeColorCellProps) => {
  const year = row;
  const isEditing = editingRow?.recruitYear === year.recruitYear;

  if (isEditing) {
    return <ThemeColorWithForm />;
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
