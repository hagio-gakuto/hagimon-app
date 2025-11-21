import { ApiClientError } from "./api-client";

export const extractErrorMessage = (
  error: unknown,
  defaultMessage: string
): string => {
  const errorMessageExtractorMap: Record<string, (error: unknown) => string> = {
    ApiClientError: (err) => (err instanceof ApiClientError ? err.message : ""),
    Error: (err) => (err instanceof Error ? err.message : ""),
  };

  return (
    errorMessageExtractorMap.ApiClientError(error) ||
    errorMessageExtractorMap.Error(error) ||
    defaultMessage
  );
};
