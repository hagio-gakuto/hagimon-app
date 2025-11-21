"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { Title, PageContainer, Loading, Button } from "@/components/ui";
import { apiClient } from "@/libs/api-client";
import { extractErrorMessage } from "@/libs/error-handler";
import { formatDateToJST } from "@/libs/date-utils";
import type { UserResponseDto, UserRole, Gender } from "@/types/user";

const roleLabelMap: Record<UserRole, string> = {
  user: "ユーザー",
  admin: "管理者",
  master: "マスター",
};

const genderLabelMap: Record<Gender, string> = {
  male: "男性",
  female: "女性",
  other: "その他",
};

type UserDetailProps = {
  userId: string;
};

export const UserDetail = ({ userId }: UserDetailProps) => {
  const router = useRouter();
  const { setItems } = useBreadcrumb();
  const [user, setUser] = useState<UserResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setItems([
      { label: "ホーム", href: "/" },
      { label: "ユーザー管理", href: "/master/user-management" },
      { label: "ユーザー詳細" },
    ]);
  }, [setItems]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await apiClient<UserResponseDto>(`/users/${userId}`);
        setUser(data);
      } catch (err) {
        const message = extractErrorMessage(
          err,
          "ユーザー情報の取得に失敗しました"
        );
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (isLoading) {
    return (
      <PageContainer>
        <Title>ユーザー詳細</Title>
        <Loading />
      </PageContainer>
    );
  }

  if (error || !user) {
    return (
      <PageContainer>
        <Title>ユーザー詳細</Title>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800 text-sm">
              {error || "ユーザーが見つかりません"}
            </p>
          </div>
          <div className="mt-4">
            <Button
              variant="outline"
              onClick={() => router.push("/master/user-management")}
            >
              一覧に戻る
            </Button>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Title>ユーザー詳細</Title>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="block text-sm font-medium text-gray-700 mb-1">
              ID
            </div>
            <p className="text-sm text-gray-900">{user.id}</p>
          </div>
          <div>
            <div className="block text-sm font-medium text-gray-700 mb-1">
              メールアドレス
            </div>
            <p className="text-sm text-gray-900">{user.email}</p>
          </div>
          <div>
            <div className="block text-sm font-medium text-gray-700 mb-1">
              姓
            </div>
            <p className="text-sm text-gray-900">{user.lastName}</p>
          </div>
          <div>
            <div className="block text-sm font-medium text-gray-700 mb-1">
              名
            </div>
            <p className="text-sm text-gray-900">{user.firstName}</p>
          </div>
          <div>
            <div className="block text-sm font-medium text-gray-700 mb-1">
              権限
            </div>
            <p className="text-sm text-gray-900">{roleLabelMap[user.role]}</p>
          </div>
          <div>
            <div className="block text-sm font-medium text-gray-700 mb-1">
              性別
            </div>
            <p className="text-sm text-gray-900">
              {user.gender ? genderLabelMap[user.gender] : "-"}
            </p>
          </div>
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

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => router.push("/master/user-management")}
          >
            一覧に戻る
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};
