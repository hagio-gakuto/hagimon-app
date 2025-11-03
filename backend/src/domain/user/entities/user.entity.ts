import { ImageUrl } from '../value-objects/image-url';
import { USER_CONSTANTS, USER_ERROR_MESSAGES } from '../constants/user.constants';
import { UserId } from '../value-objects/user-id';

export interface UserProps {
  id: UserId;
  name: string;
  age: number;
  hobby: string;
  imageUrl: ImageUrl | null;
  introduction: string | null;
}

export class User {
  private constructor(private p: UserProps) {}

  private static normalizeText(text: string | null | undefined): string | null {
    return text?.trim() || null;
  }

  private static normalizeRequiredText(text: string | null | undefined): string {
    return text?.trim() || '';
  }

  static create(props: UserProps): User {
    const normalizedName = User.normalizeText(props.name);
    if (!normalizedName) {
      throw new Error(USER_ERROR_MESSAGES.NAME_REQUIRED);
    }

    const normalizedHobby = User.normalizeRequiredText(props.hobby);
    if (!normalizedHobby) {
      throw new Error(USER_ERROR_MESSAGES.HOBBY_REQUIRED);
    }
    if (
      normalizedHobby.length < USER_CONSTANTS.HOBBY.MIN_LENGTH ||
      normalizedHobby.length > USER_CONSTANTS.HOBBY.MAX_LENGTH
    ) {
      throw new Error(USER_ERROR_MESSAGES.HOBBY_LENGTH_OUT_OF_RANGE);
    }

    const normalizedIntroduction = User.normalizeText(props.introduction);
    if (normalizedIntroduction) {
      if (
        normalizedIntroduction.length < USER_CONSTANTS.INTRODUCTION.MIN_LENGTH ||
        normalizedIntroduction.length > USER_CONSTANTS.INTRODUCTION.MAX_LENGTH
      ) {
        throw new Error(USER_ERROR_MESSAGES.INTRODUCTION_LENGTH_OUT_OF_RANGE);
      }
    }

    if (!Number.isInteger(props.age)) {
      throw new Error(USER_ERROR_MESSAGES.AGE_MUST_BE_INTEGER);
    }
    if (
      props.age < USER_CONSTANTS.AGE.MIN ||
      props.age > USER_CONSTANTS.AGE.MAX
    ) {
      throw new Error(USER_ERROR_MESSAGES.AGE_OUT_OF_RANGE);
    }

    return new User({
      ...props,
      name: normalizedName,
      hobby: normalizedHobby,
      introduction: normalizedIntroduction,
    });
  }

  toDTO() {
    return {
      id: this.p.id.toString(),
      name: this.p.name,
      age: this.p.age,
      hobby: this.p.hobby,
      imageUrl: this.p.imageUrl?.toString() ?? null,
      introduction: this.p.introduction,
    };
  }
}

