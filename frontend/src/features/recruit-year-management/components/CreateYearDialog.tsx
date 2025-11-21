"use client";

import { Dialog, Form, Input, ColorPicker, Button } from "@/components/ui";
import { useRecruitYear } from "@/contexts/RecruitYearContext";
import type { RecruitYearFormData } from "../hooks/useRecruitYearManagement";

type CreateYearDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RecruitYearFormData) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
};

export const CreateYearDialog = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  error,
}: CreateYearDialogProps) => {
  const { recruitYears } = useRecruitYear();

  const calculateNextYear = () => {
    if (recruitYears.length > 0) {
      const maxYear = Math.max(...recruitYears.map((y) => y.recruitYear));
      return maxYear + 1;
    }
    // 現在の年度がない場合は、現在の年から計算
    const currentYear = new Date().getFullYear();
    return currentYear;
  };

  const nextYear = calculateNextYear();

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="新規年度作成" size="md">
      <Form<RecruitYearFormData>
        key={isOpen ? `form-${nextYear}` : "form-closed"}
        defaultValues={{
          recruitYear: nextYear,
          displayName: "",
          themeColor: "#1E88E5",
        }}
        onSubmit={onSubmit}
      >
        {({ register, formState: { errors }, watch, setValue }) => {
          const themeColor = watch("themeColor");
          const recruitYear = watch("recruitYear");

          return (
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="recruit-year-display"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  年度
                </label>
                <div
                  id="recruit-year-display"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                >
                  {recruitYear}年度
                </div>
                <input
                  type="hidden"
                  {...register("recruitYear", {
                    required: "年度は必須です",
                    valueAsNumber: true,
                  })}
                />
              </div>

              <Input
                label="表示名"
                {...register("displayName", {
                  required: "表示名は必須です",
                  minLength: {
                    value: 1,
                    message: "表示名は1文字以上で入力してください",
                  },
                })}
                error={errors.displayName?.message}
              />

              <ColorPicker
                label="テーマカラー"
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

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              <div className="flex gap-4 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  キャンセル
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "作成中..." : "作成"}
                </Button>
              </div>
            </div>
          );
        }}
      </Form>
    </Dialog>
  );
};
