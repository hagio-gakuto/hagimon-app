import {Controller,Get,UseGuards,Req,Res} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {JwtService} from "@nestjs/jwt";

const COOKIE_MAX_AGE_MINUTES = 15;
const COOKIE_MAX_AGE_MS = COOKIE_MAX_AGE_MINUTES * 60 * 1000;

@Controller('auth/github')
export class GitHubAuthController{
  constructor(private jwtService: JwtService){}

  @Get()
  @UseGuards(AuthGuard('github'))
  async loginWithGitHub(){
  }

  @Get('callback')
  @UseGuards(AuthGuard('github'))
  async callback(@Req() req ,@Res() res){
    const payload = {username: req.user.username, sub: req.user.githubId};// githubからのコールバックからusername,Idを取得
    const jwt = this.jwtService.sign(payload);

    res.cookie('access_token',jwt,{httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: COOKIE_MAX_AGE_MS});// フロントにアクセストークンを返す
    return res.redirect(process.env.FRONTEND_URL ?? 'http://localhost:3000');
  }
}
