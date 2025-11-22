"use client";

import { useForm, FormProvider } from "react-hook-form";
import type { UseFormSetError } from "react-hook-form";
import { Button, SaveIcon, CancelIcon } from "@/components/ui";
import { TextField, SelectField } from "@/components/form";
import { formatDateToJST } from "@/libs/date-utils";
import { roleOptions, genderOptions } from "../constants/user.constants";
import type { UserResponseDto, UserRole, Gender } from "@/types/user";

type UserFormData = {
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  gender: Gender | "";
};

type UserDetailFormProps = {
  user: UserResponseDto;
  onSubmit: (
    data: UserFormData,
    setError: UseFormSetError<UserFormData>
  ) => Promise<void>;
  onCancel: () => void;
};

export const UserDetailForm = ({
  user,
  onSubmit,
  onCancel,
}: UserDetailFormProps) => {
  const methods = useForm<UserFormData>({
    defaultValues: {
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender || "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const handleSubmit = methods.handleSubmit((data) => {
    void onSubmit(data, methods.setError);
  });

  return (
    <div key={`${user.id}-edit`}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="block text-sm font-medium text-gray-700 mb-1">
                ID
              </div>
              <p className="text-sm text-gray-900">{user.id}</p>
            </div>
            <TextField
              name="email"
              label="メールアドレス"
              rules={{ required: "メールアドレスは必須です" }}
            />
            <TextField
              name="lastName"
              label="姓"
              rules={{ required: "姓は必須です" }}
            />
            <TextField
              name="firstName"
              label="名"
              rules={{ required: "名は必須です" }}
            />
            <SelectField
              name="role"
              label="権限"
              options={roleOptions.filter((opt) => opt.value !== "")}
              rules={{ required: "権限は必須です" }}
            />
            <SelectField name="gender" label="性別" options={genderOptions} />
            <div>
              <div className="block text-sm font-medium text-gray-700 mb-1">
                作成日時
              </div>
              <p className="text-sm text-gray-900">
                {formatDateToJST(user.createdAt)}
              </p>
            </div>
            <div>
              <div className="block text-sm font-medium text-gray-700 mb-1">
                更新日時
              </div>
              <p className="text-sm text-gray-900">
                {formatDateToJST(user.updatedAt)}
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Button type="button" variant="outline" onClick={onCancel}>
              <div className="flex items-center gap-2">
                <CancelIcon />
                <span>キャンセル</span>
              </div>
            </Button>
            <Button type="submit" variant="primary">
              <div className="flex items-center gap-2">
                <SaveIcon />
                <span>保存</span>
              </div>
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
