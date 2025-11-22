import { useState, useEffect, useCallback } from "react";
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

type UseUserDetailParams = {
  userId: string;
};

export const useUserDetail = ({ userId }: UseUserDetailParams) => {
  const router = useRouter();
  const { setItems } = useBreadcrumb();
  const [user, setUser] = useState<UserResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setItems([
      { label: "ホーム", href: "/" },
      { label: "ユーザー管理", href: "/master/user-management" },
      { label: "ユーザー詳細" },
    ]);
  }, [setItems]);

  const fetchUser = useCallback(async () => {
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
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleSubmit = useCallback(
    async (data: UserFormData, setFormError: UseFormSetError<UserFormData>) => {
      console.log(data);
      console.log(setFormError);
      if (!user) return;

      try {
        setError(null);
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
        await fetchUser();
        setIsEditing(false);
        toast.success("ユーザーを更新しました");
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
            errorMessages.userUpdateFailed
          );
          setError(message);
        }
      }
    },
    [user, fetchUser]
  );

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setError(null);
  }, []);

  const handleBack = useCallback(() => {
    router.push("/master/user-management");
  }, [router]);

  return {
    user,
    isLoading,
    error,
    isEditing,
    handleSubmit,
    handleEdit,
    handleCancel,
    handleBack,
  };
};
