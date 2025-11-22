import { useCallback } from "react";
import toast from "react-hot-toast";
import { apiClient } from "@/libs/api-client";
import { extractErrorMessage } from "@/libs/error-handler";
import { errorMessages } from "@/constants/error-messages";
import { formatDateToISOString } from "@/libs/date-utils";
import { convertToCSV, downloadCSV } from "@/libs/csv-utils";
import { parseCSV } from "@/libs/csv-parse";
import { chunk } from "@/libs/array-utils";
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
import type { UserResponseDto, UserRole, Gender } from "@/types/user";

type UserSearchFormData = {
  id: string;
  search: string;
  role: UserRole | "";
  gender: Gender | "";
};

type UseUserCsvParams = {
  searchParams: UserSearchFormData;
  users: UserResponseDto[];
  fetchUsers: () => Promise<void>;
};

export const useUserCsv = ({
  searchParams,
  users,
  fetchUsers,
}: UseUserCsvParams) => {
  const handleExportCSV = useCallback(async () => {
    try {
      const params = new URLSearchParams();
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

      const exportUsers = await apiClient<UserResponseDto[]>(
        `/users/export?${params.toString()}`
      );

      const csvData = exportUsers.map((user) => ({
        ID: user.id,
        メールアドレス: user.email,
        姓: user.lastName,
        名: user.firstName,
        権限: roleLabelMap[user.role],
        性別: user.gender ? genderLabelMap[user.gender] : "-",
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

        // CSVが空でないことを確認
        if (csvData.length === 0) {
          throw new Error("CSVファイルにデータが含まれていません");
        }

        // 必須フィールドの検証（作成モード）
        if (!isEdit) {
          const invalidRows = csvData.filter(
            (row) => !row["メールアドレス"] || !row["姓"] || !row["名"]
          );
          if (invalidRows.length > 0) {
            throw new Error(
              `必須項目が不足している行があります: ${invalidRows.length}件`
            );
          }

          // メールアドレスの重複チェック（作成モード）
          const emails = csvData.map((row) => row["メールアドレス"]);
          const duplicates = emails.filter(
            (email, index) => emails.indexOf(email) !== index
          );
          if (duplicates.length > 0) {
            throw new Error(
              `重複するメールアドレスがあります: ${duplicates.join(", ")}`
            );
          }
        }

        // 編集モードでのID存在チェック
        if (isEdit) {
          const invalidRows = csvData.filter((row) => !row["ID"]);
          if (invalidRows.length > 0) {
            throw new Error(
              `IDが不足している行があります: ${invalidRows.length}件`
            );
          }
        }

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

          // チャンク処理（50件ずつ処理）
          const userChunks = chunk(users, 50);
          let succeeded = 0;
          let failed = 0;

          for (const userChunk of userChunks) {
            const results = await Promise.allSettled(
              userChunk.map((user) =>
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

            results.forEach((result) => {
              if (result.status === "fulfilled") {
                succeeded++;
              } else {
                failed++;
              }
            });
          }

          await fetchUsers();
          if (failed > 0) {
            toast.error(`${succeeded}件成功、${failed}件失敗しました`);
          } else {
            toast.success(`ユーザーを${succeeded}件更新しました`);
          }
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

          await fetchUsers();
          toast.success(`ユーザーを${users.length}件登録しました`);
        }
      } catch (err) {
        const message = extractErrorMessage(err, errorMessages.csvUploadFailed);
        throw new Error(message);
      }
    },
    [fetchUsers]
  );

  return {
    handleExportCSV,
    handleDownloadTemplateCSV,
    handleDownloadEditTemplateCSV,
    handleUploadCSV,
  };
};
