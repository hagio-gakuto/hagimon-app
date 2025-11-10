import {ConfigService} from '@nestjs/config';
import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy (Strategy, 'github'){
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GITHUB_CALLBACK_URL'),
      scope: ['user', 'repo'],
    });
  }
  validate(accessToken: string, refreshToken: string, profile: any) {
    const user = {
      githubId: profile.id,
      userName: profile.username,
      accessToken,
    };
    return user;
  }
}


