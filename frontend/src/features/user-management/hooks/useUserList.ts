import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { apiClient } from "@/libs/api-client";
import { extractErrorMessage } from "@/libs/error-handler";
import { errorMessages } from "@/constants/error-messages";
import { DEFAULT_PAGE_SIZE } from "@/constants/page";
import type {
  UserListResponseDto,
  UserResponseDto,
  UserRole,
  Gender,
} from "@/types/user";

type UserSearchFormData = {
  id: string;
  search: string;
  role: UserRole | "";
  gender: Gender | "";
};

export const useUserList = () => {
  const router = useRouter();
  const { setItems } = useBreadcrumb();
  const [users, setUsers] = useState<UserResponseDto[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<UserSearchFormData>({
    id: "",
    search: "",
    role: "",
    gender: "",
  });

  useEffect(() => {
    setItems([{ label: "ホーム", href: "/" }, { label: "ユーザー管理" }]);
  }, [setItems]);

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: DEFAULT_PAGE_SIZE.toString(),
      });

      if (searchParams.id) {
        params.append("id", searchParams.id);
      }
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
        errorMessages.userListFetchFailed
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
      id: "",
      search: "",
      role: "",
      gender: "",
    });
    setPage(1);
  };

  const handleRowClick = (row: { id: string }) => {
    if (row.id === "new") {
      router.push("/master/user-management/new");
    } else {
      router.push(`/master/user-management/${row.id}`);
    }
  };

  return {
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
    fetchUsers,
  };
};
