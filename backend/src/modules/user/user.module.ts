import { Module } from '@nestjs/common';
import { UserQueryModule } from '../../query/controller/user/user.module';
import { UserCommandModule } from './user-command.module';

@Module({
  imports: [UserQueryModule, UserCommandModule],
})
export class UserModule {}
