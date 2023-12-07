import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { HttpException, HttpStatus} from '@nestjs/common'
import {ConfigService} from'@nestjs/config'
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadInterface } from './interfaces/tokenPayload.interface';
import { EmailService } from 'src/email/email.service';
import { Inject } from '@nestjs/common';
import {CACHE_MANAGER} from '@nestjs/cache-manager'
import { Cache } from 'cache-manager';
import { EmailCheckDto } from './dto/login-check.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService : UserService,
    private readonly configService : ConfigService,
    private readonly jwtService : JwtService,
    private readonly emailService : EmailService,
    @Inject(CACHE_MANAGER) private cacheManager : Cache

  ) {}

  //가입
  async createU(c:CreateUserDto) {
    try{
      return await this.userService.createU(c)} 
      catch(e) {
        console.log(e)
        throw new HttpException('xxx', HttpStatus.NOT_FOUND)
      }
    
    
  }

  //로그인

  //service 단에서는 비밀번호 체크하고 user반환


  async loginU(l:LoginUserDto) {
    const user = await this.userService.findUserByEmail(l.email)
    const ispwmatched = await user.checkPassword(l.password)
    if (!ispwmatched) throw new HttpException('xxx', HttpStatus.NOT_FOUND)
    return user
  }

  //토큰
  public generateAccessToken(userId : string) {
    const payload : TokenPayloadInterface = {userId}
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}`,     
    })
    return token
  }

  //이메일인증
  async emailverification(email:string) {

    const code = this.generateOTP()
    await this.emailService.sendMail({

      to : email,
      subject : 'email verification',
      text : `verification code is ${code}`
    })
    await this.cacheManager.set(email, code)
    console.log(email,code)
    return 'success'
  }

  //이메일인증확인
  async emailcheck(emailcheck: EmailCheckDto) {
    const vcode = await this.cacheManager.get(emailcheck.email)
    console.log(emailcheck.email, vcode)
    if ( vcode != emailcheck.code ) throw new HttpException('xx', HttpStatus.BAD_REQUEST)
    return 'passssssss'
  }



  generateOTP() {
    let OTP = ''
    for (let i=1; i<=6; i++) {
      OTP += Math.floor(Math.random()*10)
    }
    return OTP
  }



}
