import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { UseFormSetError } from "react-hook-form";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { apiClient, ApiClientError } from "@/libs/api-client";
import { extractErrorMessage } from "@/libs/error-handler";
import { errorMessages } from "@/constants/error-messages";
import type { UserResponseDto, UserRole, Gender } from "@/types/user";

type UserFormData = {
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  gender: Gender | "";
};

type UseUserFormParams = {
  userId: string | undefined;
};

export const useUserForm = ({ userId }: UseUserFormParams) => {
  const router = useRouter();
  const { setItems } = useBreadcrumb();
  const isEdit = userId && userId !== "new";
  const [isLoading, setIsLoading] = useState(isEdit);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserResponseDto | null>(null);

  useEffect(() => {
    setItems([
      { label: "ホーム", href: "/" },
      { label: "ユーザー管理", href: "/master/user-management" },
      { label: isEdit ? "ユーザー編集" : "ユーザー新規登録" },
    ]);
  }, [setItems, isEdit]);

  const fetchUser = useCallback(async () => {
    if (!isEdit || !userId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await apiClient<UserResponseDto>(`/users/${userId}`);
      setUser(data);
    } catch (err) {
      const message = extractErrorMessage(err, errorMessages.userFetchFailed);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [userId, isEdit]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleSubmit = useCallback(
    async (data: UserFormData, setFormError: UseFormSetError<UserFormData>) => {
      try {
        if (isEdit && user) {
          await apiClient<UserResponseDto>(`/users/${user.id}`, {
            method: "PUT",
            body: {
              email: data.email,
              role: data.role,
              firstName: data.firstName,
              lastName: data.lastName,
              gender: data.gender || null,
            },
          });
        } else {
          await apiClient<UserResponseDto>("/users", {
            method: "POST",
            body: {
              email: data.email,
              role: data.role,
              firstName: data.firstName,
              lastName: data.lastName,
              gender: data.gender || null,
            },
          });
        }
        toast.success(
          isEdit ? "ユーザーを更新しました" : "ユーザーを作成しました"
        );
        router.push("/master/user-management");
      } catch (err) {
        if (err instanceof ApiClientError && err.details) {
          // サーバーからのバリデーションエラーを各フィールドに設定
          err.details.forEach((detail) => {
            const fieldName = detail.path[0] as keyof UserFormData;
            if (fieldName) {
              setFormError(fieldName, {
                type: "server",
                message: detail.message,
              });
            }
          });
        } else {
          // バリデーションエラー以外のエラーは画面の上部に表示
          const message = extractErrorMessage(
            err,
            isEdit
              ? errorMessages.userUpdateFailed
              : errorMessages.userCreateFailed
          );
          setError(message);
        }
      }
    },
    [isEdit, user, router]
  );

  const handleCancel = useCallback(() => {
    router.push("/master/user-management");
  }, [router]);

  const defaultValues: UserFormData = useMemo(
    () =>
      user
        ? {
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender || "",
          }
        : {
            email: "",
            role: "user",
            firstName: "",
            lastName: "",
            gender: "",
          },
    [user]
  );

  return {
    isLoading,
    error,
    isEdit,
    defaultValues,
    handleSubmit,
    handleCancel,
  };
};
