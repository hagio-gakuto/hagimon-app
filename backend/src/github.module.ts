import { Module } from "@nestjs/common";
import {PassportModule} from "@nestjs/passport"
import { GitHubAuthController } from "./github-auth.controller";
import { GithubStrategy } from "./github.strategy";

@Module({
  imports: [PassportModule.register({session: false}),JwtModule.register({secret: process.env.JWT_SECRET!, signOptions: {expiresIn: '30m'}})],
  controllers: [GitHubAuthController],
  providers: [GithubStrategy],
})
export class GithubModule{}
