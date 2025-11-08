import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy (Strategy, 'github'){
  constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: process.env.GITHUB_CALLBACK_URL!,
      scope: ['user', 'repo'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
    const user = {
      githubId: profile.id,
      userName: profile.userName,
      accessToken,
    };
    done(null, user);
  }
}


