import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/libs/api-client";
import { extractErrorMessage } from "@/libs/error-handler";
import { DEFAULT_PAGE_SIZE } from "@/constants/page";
import type {
  UserListResponseDto,
  UserResponseDto,
  UserRole,
  Gender,
} from "@/types/user";

type UserSearchFormData = {
  search: string;
  role: UserRole | "";
  gender: Gender | "";
};

export const useUserManagement = () => {
  const [users, setUsers] = useState<UserResponseDto[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<UserSearchFormData>({
    search: "",
    role: "",
    gender: "",
  });

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: DEFAULT_PAGE_SIZE.toString(),
      });

      if (searchParams.search) {
        params.append("search", searchParams.search);
      }
      if (searchParams.role) {
        params.append("role", searchParams.role);
      }
      if (searchParams.gender) {
        params.append("gender", searchParams.gender);
      }

      const data = await apiClient<UserListResponseDto>(
        `/users?${params.toString()}`
      );
      setUsers(data.users);
      setTotal(data.total);
    } catch (err) {
      const message = extractErrorMessage(
        err,
        "ユーザー一覧の取得に失敗しました"
      );
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [page, searchParams]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = (data: UserSearchFormData) => {
    setSearchParams(data);
    setPage(1);
  };

  const handleReset = () => {
    setSearchParams({
      search: "",
      role: "",
      gender: "",
    });
    setPage(1);
  };

  return {
    users,
    total,
    page,
    isLoading,
    error,
    handleSearch,
    handleReset,
    setPage,
    searchParams,
  };
};
