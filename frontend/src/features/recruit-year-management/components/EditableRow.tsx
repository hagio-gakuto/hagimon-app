"use client";

import { Form, ColorPicker, Button } from "@/components/ui";
import { TextField } from "@/components/form";
import { useFormContext } from "react-hook-form";
import type { RecruitYearFormData } from "../hooks/useRecruitYearManagement";

type EditableRowProps = {
  editingRow: RecruitYearFormData;
  onSave: (data: RecruitYearFormData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
};

export const EditableRow = ({
  editingRow,
  onSave,
  onCancel,
  isSubmitting,
}: EditableRowProps) => {
  return (
    <Form<RecruitYearFormData> defaultValues={editingRow} onSubmit={onSave}>
      <EditableRowContent onCancel={onCancel} isSubmitting={isSubmitting} />
    </Form>
  );
};

const EditableRowContent = ({
  onCancel,
  isSubmitting,
}: {
  onCancel: () => void;
  isSubmitting: boolean;
}) => {
  const { watch, setValue, register, formState } =
    useFormContext<RecruitYearFormData>();
  const themeColor = watch("themeColor");
  const errors = formState.errors;

  return (
    <>
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
      <ColorPicker
        label=""
        value={themeColor || ""}
        onChange={(color) => {
          setValue("themeColor", color, { shouldValidate: true });
        }}
        error={errors.themeColor?.message}
        register={register("themeColor", {
          required: "テーマカラーは必須です",
          pattern: {
            value: /^#[0-9A-Fa-f]{6}$/,
            message:
              "テーマカラーは#RRGGBB形式で入力してください（例: #1E88E5）",
          },
        })}
      />
      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={isSubmitting}>
          {isSubmitting ? "保存中..." : "保存"}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          キャンセル
        </Button>
      </div>
    </>
  );
};
