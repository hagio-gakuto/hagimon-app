"use client";

import { useRecruitYear } from "@/contexts/RecruitYearContext";
import { Button, Loading, Title, Table, PageContainer } from "@/components/ui";
import { useForm, FormProvider } from "react-hook-form";
import { useRecruitYearManagement } from "../hooks/useRecruitYearManagement";
import { CreateYearDialog } from "./CreateYearDialog";
import { getTableColumns } from "./RecruitYearTableColumns";
import type { RecruitYearFormData } from "../hooks/useRecruitYearManagement";
import type { RecruitYearResponseDto } from "@/types/recruit-year";

const RecruitYearEditForm = ({
  editingRow,
  onSave,
  onCancel,
  isSubmitting,
  recruitYears,
  startEdit,
}: {
  editingRow: RecruitYearFormData;
  onSave: (data: RecruitYearFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
  recruitYears: RecruitYearResponseDto[];
  startEdit: (year: RecruitYearResponseDto) => void;
}) => {
  const methods = useForm<RecruitYearFormData>({
    defaultValues: editingRow,
    mode: "onBlur",
  });

  const handleSubmit = methods.handleSubmit(async (data) => {
    await onSave(data);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <Table
          columns={getTableColumns({
            editingRow,
            isSubmitting,
            startEdit,
            cancelEdit: onCancel,
          })}
          data={recruitYears}
          emptyMessage="年度データがありません"
        />
      </form>
    </FormProvider>
  );
};

export const RecruitYearManagement = () => {
  const { recruitYears, isLoading } = useRecruitYear();
  const {
    editingRow,
    isSubmitting,
    error,
    isCreating,
    setIsCreating,
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
        {editingRow ? (
          <RecruitYearEditForm
            editingRow={editingRow}
            onSave={handleUpdate}
            onCancel={cancelEdit}
            isSubmitting={isSubmitting}
            recruitYears={recruitYears}
            startEdit={startEdit}
          />
        ) : (
          <Table
            columns={getTableColumns({
              editingRow: null,
              isSubmitting,
              startEdit,
              cancelEdit,
            })}
            data={recruitYears}
            emptyMessage="年度データがありません"
          />
        )}
      </div>

      <CreateYearDialog
        isOpen={isCreating}
        onClose={() => setIsCreating(false)}
        onSubmit={handleCreate}
        isSubmitting={isSubmitting}
        error={error}
      />
    </PageContainer>
  );
};
