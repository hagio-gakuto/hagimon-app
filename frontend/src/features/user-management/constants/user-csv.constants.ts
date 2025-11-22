import type { CsvHeader } from "@/libs/csv-utils";

export const userExportCsvHeaders: CsvHeader[] = [
  { key: "メールアドレス", label: "メールアドレス" },
  { key: "名前", label: "名前" },
  { key: "権限", label: "権限" },
  { key: "性別", label: "性別" },
  { key: "作成日時", label: "作成日時" },
];

export const userCreateTemplateCsvHeaders: CsvHeader[] = [
  { key: "メールアドレス", label: "メールアドレス" },
  { key: "姓", label: "姓" },
  { key: "名", label: "名" },
  { key: "権限", label: "権限" },
  { key: "性別", label: "性別" },
];

export const userEditTemplateCsvHeaders: CsvHeader[] = [
  { key: "ID", label: "ID" },
  { key: "メールアドレス", label: "メールアドレス" },
  { key: "姓", label: "姓" },
  { key: "名", label: "名" },
  { key: "権限", label: "権限" },
  { key: "性別", label: "性別" },
];
