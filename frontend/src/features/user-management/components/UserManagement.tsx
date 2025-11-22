"use client";

import {
  Table,
  Title,
  PageContainer,
  Button,
  Loading,
  CsvExportButton,
  CsvUploadButton,
  PlusIcon,
} from "@/components/ui";
import { useUserManagement } from "@/features/user-management/hooks/useUserManagement";
import { formatDateToJST } from "@/libs/date-utils";
import { roleLabelMap, genderLabelMap } from "../constants/user.constants";
import { errorMessages } from "@/constants/error-messages";
import { UserSearchForm } from "./UserSearchForm";

export const UserManagement = () => {
  const {
    users,
    total,
    page,
    isLoading,
    error,
    setError,
    handleSearch,
    handleReset,
    setPage,
    searchParams,
    handleRowClick,
    handleExportCSV,
    handleDownloadTemplateCSV,
    handleDownloadEditTemplateCSV,
    handleUploadCSV,
  } = useUserManagement();

  const columns = [
    { key: "id", label: "ID" },
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
            handleRowClick(row);
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
      <div className="flex justify-between items-center">
        <Title>ユーザー管理</Title>
        <Button variant="primary" onClick={() => handleRowClick({ id: "new" })}>
          <div className="flex items-center gap-2">
            <PlusIcon />
            <span>新規登録</span>
          </div>
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <UserSearchForm
          onSearch={handleSearch}
          onReset={handleReset}
          searchParams={searchParams}
        />

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={handleDownloadTemplateCSV}>
            一括登録
          </Button>
          <CsvUploadButton
            onUpload={async (file) => {
              try {
                await handleUploadCSV(file, false);
              } catch (err) {
                setError(
                  err instanceof Error
                    ? err.message
                    : errorMessages.csvUploadFailed
                );
              }
            }}
            variant="secondary"
          >
            一括登録
          </CsvUploadButton>
          <Button variant="secondary" onClick={handleDownloadEditTemplateCSV}>
            一括編集
          </Button>
          <CsvUploadButton
            onUpload={async (file) => {
              try {
                await handleUploadCSV(file, true);
              } catch (err) {
                setError(
                  err instanceof Error
                    ? err.message
                    : errorMessages.csvUploadFailed
                );
              }
            }}
            variant="secondary"
          >
            一括編集
          </CsvUploadButton>
          <CsvExportButton
            onExport={async () => {
              try {
                await handleExportCSV();
              } catch (err) {
                setError(
                  err instanceof Error
                    ? err.message
                    : errorMessages.csvExportFailed
                );
              }
            }}
            variant="outline"
          >
            CSV出力
          </CsvExportButton>
        </div>

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
