export const formatDateToJST = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const formatDateToISOString = (date?: Date | string): string => {
  const dateObj = date
    ? typeof date === "string"
      ? new Date(date)
      : date
    : new Date();
  return dateObj.toISOString().split("T")[0];
};
