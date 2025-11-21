"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";
import type { RecruitYearResponseDto } from "@/types/recruit-year";

type RecruitYearContextType = {
  recruitYears: RecruitYearResponseDto[];
  selectedRecruitYear: RecruitYearResponseDto | null;
  setSelectedRecruitYear: (year: RecruitYearResponseDto | null) => void;
  setRecruitYears: (years: RecruitYearResponseDto[]) => void;
  isLoading: boolean;
  error: Error | null;
};

const RecruitYearContext = createContext<RecruitYearContextType | undefined>(
  undefined
);

import { apiClient } from "@/libs/api-client";
import { extractErrorMessage } from "@/libs/error-handler";

export const RecruitYearProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [recruitYears, setRecruitYears] = useState<RecruitYearResponseDto[]>(
    []
  );
  const [selectedRecruitYear, setSelectedRecruitYear] =
    useState<RecruitYearResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    // 既にデータがある場合は再取得しない
    if (recruitYears.length > 0) {
      setIsLoading(false);
      hasFetchedRef.current = true;
      return;
    }

    // 既に取得済みの場合は再取得しない
    if (hasFetchedRef.current) {
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await apiClient<RecruitYearResponseDto[]>(
          "/recruit-years"
        );

        setRecruitYears(data);
        if (data.length === 0) {
          setError(new Error("対象年度が設定されていません"));
          hasFetchedRef.current = true;
          return;
        }
        setSelectedRecruitYear((prev) => prev || data[0]);
        setError(null);
        hasFetchedRef.current = true;
      } catch (err) {
        const message = extractErrorMessage(
          err,
          "予期せぬエラーが発生しました"
        );
        const error = new Error(message);

        // 既存のデータがある場合はエラーを設定しない（既存の状態を保持）
        setRecruitYears((prev) => {
          if (prev.length > 0) {
            hasFetchedRef.current = true;
            return prev;
          }
          hasFetchedRef.current = true;
          return [];
        });

        // 既存の選択年度がある場合はエラーを設定しない
        setSelectedRecruitYear((prev) => {
          if (prev) {
            setError(null);
            return prev;
          }
          setError(error);
          return null;
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [recruitYears.length]);

  const value = useMemo(
    () => ({
      recruitYears,
      selectedRecruitYear,
      setSelectedRecruitYear,
      setRecruitYears,
      isLoading,
      error,
    }),
    [
      recruitYears,
      selectedRecruitYear,
      setSelectedRecruitYear,
      setRecruitYears,
      isLoading,
      error,
    ]
  );

  return (
    <RecruitYearContext.Provider value={value}>
      {children}
    </RecruitYearContext.Provider>
  );
};

export const useRecruitYear = () => {
  const context = useContext(RecruitYearContext);
  if (context === undefined) {
    throw new Error("useRecruitYear must be used within a RecruitYearProvider");
  }
  return context;
};
