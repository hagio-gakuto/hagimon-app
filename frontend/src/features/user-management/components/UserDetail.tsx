"use client";

import { Title, PageContainer, Loading } from "@/components/ui";
import { useUserDetail } from "../hooks/useUserDetail";
import { UserDetailError } from "./UserDetailError";
import { UserDetailForm } from "./UserDetailForm";
import { UserDetailView } from "./UserDetailView";

type UserDetailProps = {
  userId: string;
};

export const UserDetail = ({ userId }: UserDetailProps) => {
  const {
    user,
    isLoading,
    error,
    isEditing,
    handleSubmit,
    handleEdit,
    handleCancel,
    handleBack,
  } = useUserDetail({ userId });

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
        <UserDetailError error={error} />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Title>ユーザー詳細</Title>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {isEditing ? (
          <UserDetailForm
            user={user}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        ) : (
          <UserDetailView user={user} onEdit={handleEdit} onBack={handleBack} />
        )}
      </div>
    </PageContainer>
  );
};
