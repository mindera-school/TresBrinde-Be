import {ExtractJwt, Strategy} from 'passport-jwt';
import {UserService} from "../../user/user.service";
import {PrincipalDto} from "../dto/principal.dto";
import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET')
        })
    }

    async validate(principalDto: PrincipalDto) {
        return this.userService.findOne(JSON.parse(JSON.stringify(principalDto)).payload.id);
    }
}