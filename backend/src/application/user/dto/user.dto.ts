import { User } from '../../../domain/user/entities/user.entity';

export type UserDto = {
  id: string;
  name: string;
  age: number;
  hobby: string;
  imageUrl: string | null;
  introduction: string | null;
};

