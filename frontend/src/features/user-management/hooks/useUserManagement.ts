import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { apiClient } from "@/libs/api-client";
import { extractErrorMessage } from "@/libs/error-handler";
import { errorMessages } from "@/constants/error-messages";
import { DEFAULT_PAGE_SIZE } from "@/constants/page";
import { formatDateToJST, formatDateToISOString } from "@/libs/date-utils";
import { convertToCSV, downloadCSV } from "@/libs/csv-utils";
import { parseCSV } from "@/libs/csv-parse";
import {
  roleLabelMap,
  genderLabelMap,
  roleOptions,
  genderOptions,
} from "../constants/user.constants";
import {
  userExportCsvHeaders,
  userCreateTemplateCsvHeaders,
  userEditTemplateCsvHeaders,
} from "../constants/user-csv.constants";
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
  const router = useRouter();
  const { setItems } = useBreadcrumb();
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

  const handleExportCSV = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (searchParams.search) {
        params.append("search", searchParams.search);
      }
      if (searchParams.role) {
        params.append("role", searchParams.role);
      }
      if (searchParams.gender) {
        params.append("gender", searchParams.gender);
      }

      const exportUsers = await apiClient<UserResponseDto[]>(
        `/users/export?${params.toString()}`
      );

      const csvData = exportUsers.map((user) => ({
        メールアドレス: user.email,
        名前: `${user.lastName} ${user.firstName}`,
        権限: roleLabelMap[user.role],
        性別: user.gender ? genderLabelMap[user.gender] : "-",
        作成日時: formatDateToJST(user.createdAt),
      }));

      const csvContent = convertToCSV({
        data: csvData,
        headers: userExportCsvHeaders,
      });
      const filename = `ユーザー一覧_${formatDateToISOString()}.csv`;
      downloadCSV({ csvContent, filename });
    } catch (err) {
      const message = extractErrorMessage(err, errorMessages.csvExportFailed);
      throw new Error(message);
    }
  }, [searchParams]);

  const handleDownloadTemplateCSV = useCallback(() => {
    const templateData = [
      {
        メールアドレス: "example@example.com",
        姓: "山田",
        名: "太郎",
        権限: "user",
        性別: "male",
      },
    ];

    const csvContent = convertToCSV({
      data: templateData,
      headers: userCreateTemplateCsvHeaders,
    });
    const filename = `ユーザー登録テンプレート_${formatDateToISOString()}.csv`;
    downloadCSV({ csvContent, filename });
  }, []);

  const handleDownloadEditTemplateCSV = useCallback(() => {
    const templateData = users.slice(0, 3).map((user) => ({
      ID: user.id,
      メールアドレス: user.email,
      姓: user.lastName,
      名: user.firstName,
      権限: roleLabelMap[user.role],
      性別: user.gender ? genderLabelMap[user.gender] : "",
    }));

    const csvContent = convertToCSV({
      data: templateData,
      headers: userEditTemplateCsvHeaders,
    });
    const filename = `ユーザー編集テンプレート_${formatDateToISOString()}.csv`;
    downloadCSV({ csvContent, filename });
  }, [users]);

  const handleUploadCSV = useCallback(
    async (file: File, isEdit: boolean) => {
      try {
        const csvData = await parseCSV(file);

        if (isEdit) {
          const users = csvData.map((row) => {
            const roleOption = roleOptions.find(
              (opt) => opt.label === row["権限"] || opt.value === row["権限"]
            );
            const genderOption = genderOptions.find(
              (opt) => opt.label === row["性別"] || opt.value === row["性別"]
            );

            return {
              id: row["ID"],
              email: row["メールアドレス"],
              firstName: row["名"],
              lastName: row["姓"],
              role: (roleOption?.value || "user") as UserRole,
              gender: (genderOption?.value || null) as Gender | null,
            };
          });

          await Promise.all(
            users.map((user) =>
              apiClient<UserResponseDto>(`/users/${user.id}`, {
                method: "PUT",
                body: {
                  email: user.email,
                  role: user.role,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  gender: user.gender,
                },
              })
            )
          );
        } else {
          const users = csvData.map((row) => {
            const roleOption = roleOptions.find(
              (opt) => opt.label === row["権限"] || opt.value === row["権限"]
            );
            const genderOption = genderOptions.find(
              (opt) => opt.label === row["性別"] || opt.value === row["性別"]
            );

            return {
              email: row["メールアドレス"],
              firstName: row["名"],
              lastName: row["姓"],
              role: (roleOption?.value || "user") as UserRole,
              gender: (genderOption?.value || null) as Gender | null,
            };
          });

          await apiClient<UserResponseDto[]>("/users/bulk", {
            method: "POST",
            body: { users },
          });
        }

        await fetchUsers();
        toast.success(
          isEdit ? "ユーザーを一括更新しました" : "ユーザーを一括登録しました"
        );
      } catch (err) {
        const message = extractErrorMessage(err, errorMessages.csvUploadFailed);
        throw new Error(message);
      }
    },
    [fetchUsers]
  );

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
    handleExportCSV,
    handleDownloadTemplateCSV,
    handleDownloadEditTemplateCSV,
    handleUploadCSV,
  };
};
