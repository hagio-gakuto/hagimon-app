"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useUser } from "@/contexts/UserContext";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { PageContainer } from "@/components/ui";

export default function MyPage() {
  const { user } = useUser();
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([{ label: "ホーム", href: "/" }, { label: "マイページ" }]);
  }, [setItems]);

  if (!user) {
    return (
      <PageContainer className="max-w-4xl">
        <p className="text-center text-gray-600">
          ユーザー情報が取得できませんでした
        </p>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">マイページ</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-6 mb-6">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-white font-semibold text-2xl overflow-hidden"
            style={{
              backgroundColor: user.imageUrl ? "transparent" : "#6366f1",
            }}
          >
            {user.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt={user.name}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{user.name.charAt(0)}</span>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {user.name}
            </h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            ユーザー情報
          </h3>
          <dl className="grid grid-cols-1 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">ID</dt>
              <dd className="text-gray-900">{user.id}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">名前</dt>
              <dd className="text-gray-900">{user.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                メールアドレス
              </dt>
              <dd className="text-gray-900">{user.email}</dd>
            </div>
          </dl>
        </div>
      </div>
    </PageContainer>
  );
}
