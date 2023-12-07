import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { User } from "src/user/entities/user.entity";
import { Injectable } from "@nestjs/common";




@Injectable()

//로그인을 위주로함 
export class LocalAuthStrategy extends PassportStrategy(Strategy) {

    constructor(
        private authService : AuthService
    ) {

        super({
            usernameField : 'email'
        })

    }

        // 사용되는게 뭔지 생각해보기
    async validate(email:string, password:string) : Promise<User> {
        return await this.authService.loginU({email, password})
    }

}