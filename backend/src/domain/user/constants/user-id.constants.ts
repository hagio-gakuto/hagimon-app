export const USER_ID_RULES = {
  CUID_MIN_LENGTH: 19,
  CUID_MAX_LENGTH: 29,
  CUID_PATTERN: /^c[a-z0-9]{19,29}$/,
} as const;

export const USER_ID_ERROR_MESSAGES = {
  INVALID_FORMAT: '無効なUserId形式です',
} as const;

