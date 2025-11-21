"use client";

import { Dialog, Form, Input, ColorPicker, Button } from "@/components/ui";
import type { RecruitYearFormData } from "../hooks/useRecruitYearManagement";

type CreateYearDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<RecruitYearFormData, "recruitYear">) => Promise<void>;
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
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="新規年度作成" size="md">
      <Form<Omit<RecruitYearFormData, "recruitYear">>
        defaultValues={{
          displayName: "",
          themeColor: "#1E88E5",
        }}
        onSubmit={onSubmit}
      >
        {({ register, formState: { errors }, watch, setValue }) => {
          const themeColor = watch("themeColor");
          return (
            <div className="space-y-6">
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
