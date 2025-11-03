import {
  USER_ID_CONSTANTS,
  USER_ID_ERROR_MESSAGES,
} from '../constants/user-id.constants';

export class UserId {
  private constructor(private readonly value: string) {}

  static create(id: string): UserId {
    if (!USER_ID_CONSTANTS.CUID_PATTERN.test(id)) {
      throw new Error(USER_ID_ERROR_MESSAGES.INVALID_FORMAT);
    }
    return new UserId(id);
  }

  toString(): string {
    return this.value;
  }
}

