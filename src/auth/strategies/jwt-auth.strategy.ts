import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService} from '@nestjs/config'
import {JwtService} from '@nestjs/jwt'
import { TokenPayloadInterface } from "../interfaces/tokenPayload.interface";
import { UserService } from "src/user/user.service";
import { User } from "src/user/entities/user.entity";
import {Injectable} from '@nestjs/common'




// user-id, token, jwt
@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly configService : ConfigService,
        private readonly jwtService : JwtService,
        private readonly userService : UserService
    ) {

        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : configService.get("JWT_ACCESS_TOKEN_SECRET")

        })
    }

    async validate(payload : TokenPayloadInterface) : Promise<User> {
        return await this.userService.findUserById(payload.userId)
    }

}