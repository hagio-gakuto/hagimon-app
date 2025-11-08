export const USER_RULES = {
  AGE: {
    MIN: 0,
    MAX: 120,
  },
  HOBBY: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 100,
  },
  INTRODUCTION: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 500,
  },
} as const;

export const USER_ERROR_MESSAGES = {
  NAME_REQUIRED: '名前は必須です',
  AGE_MUST_BE_INTEGER: '年齢は整数である必要があります',
  AGE_OUT_OF_RANGE: `年齢は${USER_RULES.AGE.MIN}歳から${USER_RULES.AGE.MAX}歳の範囲である必要があります`,
  HOBBY_REQUIRED: '趣味は必須です',
  HOBBY_LENGTH_OUT_OF_RANGE: `趣味は${USER_RULES.HOBBY.MIN_LENGTH}文字以上${USER_RULES.HOBBY.MAX_LENGTH}文字以下である必要があります`,
  INTRODUCTION_LENGTH_OUT_OF_RANGE: `自己紹介は${USER_RULES.INTRODUCTION.MIN_LENGTH}文字以上${USER_RULES.INTRODUCTION.MAX_LENGTH}文字以下である必要があります`,
} as const;

