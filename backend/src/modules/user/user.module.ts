import { Module } from '@nestjs/common';
import { UserQueryModule } from '../../query/controller/user/user.module';

@Module({
  imports: [UserQueryModule],
})
export class UserModule {}
