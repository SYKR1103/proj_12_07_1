import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { RequestWithUser } from './interfaces/requestWithUser';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { EmailCheckDto } from './dto/login-check.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  async createU(@Body() c: CreateUserDto) {
    return await this.authService.createU(c);
  }


  // 로그인(//서비스단계 : 비밀번호 확인까지  -guard/strategy// - 컨트롤 단계 : 토큰 반환만)
  // @Post("/login")
  // async loginU(@Body() l:LoginUserDto) {
  //   return await this.authService.loginU(l);
  // }

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async loginU(@Req() r:RequestWithUser) {
    const {user} = r
    console.log(user)
    const token = await this.authService.generateAccessToken(user.id)
    return {user,token}
  }

  // 사용권한이 있는 애들만 정보갖고오게 하는거
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserInfo(@Req() req:RequestWithUser) {
    return req.user;
  }

  @Post('email/send')
  async emailverification(@Body("email") email:string) {
    return await this.authService.emailverification(email)
  }

  @Post('email/check')
  async emailcheck(@Body() emailcheckdto : EmailCheckDto) {
    return await this.authService.emailcheck(emailcheckdto)
  }

}
