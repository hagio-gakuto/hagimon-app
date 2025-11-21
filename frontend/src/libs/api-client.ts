const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: unknown;
  cache?: RequestCache;
};

export type ApiError = {
  statusCode: number;
  errorCode?: string;
  message: string;
  timestamp?: string;
};

export class ApiClientError extends Error {
  constructor(
    public statusCode: number,
    public errorCode: string | undefined,
    message: string
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

export const apiClient = async <T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> => {
  const { method = "GET", headers = {}, body, cache } = options;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    cache,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData: ApiError = await response.json().catch(() => ({
      statusCode: response.status,
      message: "リクエストに失敗しました",
    }));

    const statusCode = errorData.statusCode || response.status;
    const errorMessageMap: Record<number, string> = {
      500: "予期せぬエラーが発生しました",
    };

    const message =
      errorMessageMap[statusCode] ||
      errorData.message ||
      `HTTP error! status: ${statusCode}`;

    throw new ApiClientError(statusCode, errorData.errorCode, message);
  }

  return response.json();
};
