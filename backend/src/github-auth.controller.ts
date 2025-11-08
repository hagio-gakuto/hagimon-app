import {Controller,Get,UseGuards,Req,Res} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {JwtService} from "@nestjs/jwt";



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

    res.cookie('access_token',jwt);// フロントにアクセストークンを返す
  }
}
