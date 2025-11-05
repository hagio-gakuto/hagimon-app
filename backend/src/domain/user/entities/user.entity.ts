import { ImageUrl } from '../value-objects/image-url';
import { USER_RULES, USER_ERROR_MESSAGES } from '../constants/user.constants';
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
    const normalized = User.normalize(props);
    User.validate(normalized);
    return User.instantiate(normalized);
  }

  private static normalize(props: UserProps): UserProps {
    const normalizedName = User.normalizeText(props.name);
    const normalizedHobby = User.normalizeRequiredText(props.hobby);
    const normalizedIntroduction = User.normalizeText(props.introduction);

    return {
      ...props,
      name: normalizedName || '',
      hobby: normalizedHobby,
      introduction: normalizedIntroduction,
    };
  }

  private static validate(props: UserProps): void {
    if (!props.name || !props.name.trim()) {
      throw new Error(USER_ERROR_MESSAGES.NAME_REQUIRED);
    }

    if (!props.hobby || !props.hobby.trim()) {
      throw new Error(USER_ERROR_MESSAGES.HOBBY_REQUIRED);
    }
    if (
      props.hobby.length < USER_RULES.HOBBY.MIN_LENGTH ||
      props.hobby.length > USER_RULES.HOBBY.MAX_LENGTH
    ) {
      throw new Error(USER_ERROR_MESSAGES.HOBBY_LENGTH_OUT_OF_RANGE);
    }

    if (props.introduction) {
      if (
        props.introduction.length < USER_RULES.INTRODUCTION.MIN_LENGTH ||
        props.introduction.length > USER_RULES.INTRODUCTION.MAX_LENGTH
      ) {
        throw new Error(USER_ERROR_MESSAGES.INTRODUCTION_LENGTH_OUT_OF_RANGE);
      }
    }

    if (!Number.isInteger(props.age)) {
      throw new Error(USER_ERROR_MESSAGES.AGE_MUST_BE_INTEGER);
    }
    if (
      props.age < USER_RULES.AGE.MIN ||
      props.age > USER_RULES.AGE.MAX
    ) {
      throw new Error(USER_ERROR_MESSAGES.AGE_OUT_OF_RANGE);
    }
  }

  private static instantiate(props: UserProps): User {
    return new User(props);
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

