"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { Table, Title, PageContainer, Button, Loading } from "@/components/ui";
import { useUserManagement } from "@/features/user-management/hooks/useUserManagement";
import { formatDateToJST } from "@/libs/date-utils";
import { roleLabelMap, genderLabelMap } from "../constants/user.constants";
import { UserSearchForm } from "./UserSearchForm";

export const UserManagement = () => {
  const router = useRouter();
  const { setItems } = useBreadcrumb();
  const {
    users,
    total,
    page,
    isLoading,
    error,
    handleSearch,
    handleReset,
    setPage,
    searchParams,
  } = useUserManagement();

  useEffect(() => {
    setItems([{ label: "ホーム", href: "/" }, { label: "ユーザー管理" }]);
  }, [setItems]);

  const handleRowClick = (row: { id: string }) => {
    router.push(`/master/user-management/${row.id}`);
  };

  const columns = [
    { key: "email", label: "メールアドレス" },
    { key: "name", label: "名前" },
    { key: "role", label: "権限" },
    { key: "gender", label: "性別" },
    { key: "createdAt", label: "作成日時" },
    {
      key: "actions",
      label: "操作",
      render: (_value: unknown, row: { id: string }) => (
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/master/user-management/${row.id}`);
          }}
        >
          詳細・編集
        </Button>
      ),
    },
  ];

  const data = users.map((user) => ({
    id: user.id,
    email: user.email,
    name: `${user.lastName} ${user.firstName}`,
    role: roleLabelMap[user.role],
    gender: user.gender ? genderLabelMap[user.gender] : "-",
    createdAt: formatDateToJST(user.createdAt),
  }));

  if (isLoading) {
    return (
      <PageContainer>
        <Title>ユーザー管理</Title>
        <Loading />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Title>ユーザー管理</Title>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <UserSearchForm
          onSearch={handleSearch}
          onReset={handleReset}
          searchParams={searchParams}
        />

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <Table
          columns={columns}
          data={data}
          emptyMessage="ユーザーが見つかりません"
          onRowClick={handleRowClick}
          pagination={{
            page,
            total,
            onPageChange: setPage,
          }}
        />
      </div>
    </PageContainer>
  );
};
