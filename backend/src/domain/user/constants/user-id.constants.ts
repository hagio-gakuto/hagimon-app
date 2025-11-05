export const USER_ID_RULES = {
  CUID_MIN_LENGTH: 25,
  CUID_MAX_LENGTH: 25,
  CUID_PATTERN: /^c[a-z0-9]{24}$/,
} as const;

export const USER_ID_ERROR_MESSAGES = {
  INVALID_INPUT: 'UserIdは文字列である必要があります',
  INVALID_FORMAT: '無効なUserId形式です',
} as const;

