import { useState } from "react";
import { useRecruitYear } from "@/contexts/RecruitYearContext";
import type { RecruitYearResponseDto } from "@/types/recruit-year";
import { apiClient, ApiClientError } from "@/libs/api-client";

export type RecruitYearFormData = {
  recruitYear: number;
  displayName: string;
  themeColor: string;
};

type EditingRow = {
  recruitYear: number;
  displayName: string;
  themeColor: string;
};

export const useRecruitYearManagement = () => {
  const {
    recruitYears,
    selectedRecruitYear,
    setSelectedRecruitYear,
    setRecruitYears,
  } = useRecruitYear();
  const [editingRow, setEditingRow] = useState<EditingRow | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const startEdit = (year: RecruitYearResponseDto) => {
    setEditingRow({
      recruitYear: year.recruitYear,
      displayName: year.displayName,
      themeColor: year.themeColor,
    });
    setError(null);
  };

  const cancelEdit = () => {
    setEditingRow(null);
    setError(null);
  };

  const handleUpdate = async (data: RecruitYearFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      const updated = await apiClient<RecruitYearResponseDto>(
        "/recruit-years",
        {
          method: "PUT",
          body: data,
        }
      );

      const updatedYears = recruitYears.map((year) =>
        year.recruitYear === updated.recruitYear ? updated : year
      );
      setRecruitYears(updatedYears);

      if (selectedRecruitYear?.recruitYear === updated.recruitYear) {
        setSelectedRecruitYear(updated);
      }

      setEditingRow(null);
    } catch (err) {
      const errorMessageExtractorMap: Record<
        string,
        (error: unknown) => string
      > = {
        ApiClientError: (error) =>
          error instanceof ApiClientError ? error.message : "",
        Error: (error) => (error instanceof Error ? error.message : ""),
      };

      const message =
        errorMessageExtractorMap.ApiClientError(err) ||
        errorMessageExtractorMap.Error(err) ||
        "更新に失敗しました";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreate = async (
    data: Omit<RecruitYearFormData, "recruitYear">
  ) => {
    try {
      setIsSubmitting(true);
      setError(null);
      const newYear = await apiClient<RecruitYearResponseDto>(
        "/recruit-years",
        {
          method: "POST",
          body: data,
        }
      );

      const updatedYears = [...recruitYears, newYear].sort(
        (a, b) => b.recruitYear - a.recruitYear
      );
      setRecruitYears(updatedYears);
      setIsCreating(false);
    } catch (err) {
      const errorMessageExtractorMap: Record<
        string,
        (error: unknown) => string
      > = {
        ApiClientError: (error) =>
          error instanceof ApiClientError ? error.message : "",
        Error: (error) => (error instanceof Error ? error.message : ""),
      };

      const message =
        errorMessageExtractorMap.ApiClientError(err) ||
        errorMessageExtractorMap.Error(err) ||
        "作成に失敗しました";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    editingRow,
    isSubmitting,
    error,
    isCreating,
    setIsCreating,
    startEdit,
    cancelEdit,
    handleUpdate,
    handleCreate,
  };
};
