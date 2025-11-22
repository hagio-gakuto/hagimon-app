"use client";

import { useRecruitYear } from "@/contexts/RecruitYearContext";
import { Button, Loading, Title, Table, PageContainer } from "@/components/ui";
import { useRecruitYearManagement } from "../hooks/useRecruitYearManagement";
import { CreateYearDialog } from "./CreateYearDialog";
import { EditYearDialog } from "./EditYearDialog";
import { getTableColumns } from "./RecruitYearTableColumns";

export const RecruitYearManagement = () => {
  const { recruitYears, isLoading } = useRecruitYear();
  const {
    editingYear,
    isSubmitting,
    error,
    isCreating,
    setIsCreating,
    isEditing,
    setIsEditing,
    startEdit,
    cancelEdit,
    handleUpdate,
    handleCreate,
  } = useRecruitYearManagement();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-8">
        <Title>年度管理</Title>
        <Button onClick={() => setIsCreating(true)} variant="primary">
          新規作成
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <Table
          columns={getTableColumns({ startEdit })}
          data={recruitYears.map((year) => ({
            recruitYear: year.recruitYear,
            displayName: year.displayName,
            themeColor: year.themeColor,
            id: year.recruitYear,
          }))}
          emptyMessage="年度データがありません"
        />
      </div>

      <CreateYearDialog
        isOpen={isCreating}
        onClose={() => setIsCreating(false)}
        onSubmit={handleCreate}
        isSubmitting={isSubmitting}
        error={error}
      />

      <EditYearDialog
        isOpen={isEditing}
        onClose={() => {
          setIsEditing(false);
          cancelEdit();
        }}
        onSubmit={handleUpdate}
        isSubmitting={isSubmitting}
        error={error}
        year={editingYear}
      />
    </PageContainer>
  );
};
