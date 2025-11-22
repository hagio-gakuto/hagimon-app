/**
 * CSV出力用の共通ユーティリティ
 */

export type CsvHeader = {
  key: string;
  label: string;
};

/**
 * データをCSV形式の文字列に変換
 */
export const convertToCSV = ({
  data,
  headers,
}: {
  data: Record<string, unknown>[];
  headers: { key: string; label: string }[];
}): string => {
  // ヘッダー行を作成
  const headerRow = headers.map((h) => h.label).join(",");

  // データ行を作成
  const dataRows = data.map((row) => {
    return headers
      .map((header) => {
        const value = row[header.key];
        // 値がnullまたはundefinedの場合は空文字
        if (value === null || value === undefined) {
          return "";
        }
        // 文字列に変換し、カンマや改行を含む場合はダブルクォートで囲む
        const stringValue = String(value);
        if (stringValue.includes(",") || stringValue.includes("\n")) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      })
      .join(",");
  });

  // BOMを追加してExcelで文字化けしないようにする
  const BOM = "\uFEFF";
  return BOM + [headerRow, ...dataRows].join("\n");
};

/**
 * CSV文字列をBlobに変換してダウンロード
 */
export const downloadCSV = ({
  csvContent,
  filename,
}: {
  csvContent: string;
  filename: string;
}): void => {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
