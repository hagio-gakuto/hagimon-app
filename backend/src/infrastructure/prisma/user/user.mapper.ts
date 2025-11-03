import { User as PrismaUser } from '@prisma/client';
import { User, UserProps } from '../../../domain/user/entities/user.entity';
import { ImageUrl } from '../../../domain/user/value-objects/image-url';
import { UserId } from '../../../domain/user/value-objects/user-id';

export class UserMapper {
  static toDomain(prismaUser: PrismaUser): User {

    const imageUrl = ImageUrl.create(prismaUser.imageUrl);

    const userId = UserId.create(prismaUser.id);

    const props: UserProps = {
      id: userId,
      name: prismaUser.name,
      age: prismaUser.age,
      hobby: prismaUser.hobby,
      imageUrl,
      introduction: prismaUser.introduction,
    };

    return User.create(props);
  }
}

