import {Strategy} from 'passport-local';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {AuthService} from "../auth.service";
import {DetailsUserDto} from "../../user/dto/details-user.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email'
        });
    }

    async validate(email: string, password: string): Promise<DetailsUserDto> {
        return this.authService.getAuthenticatedUser(email, password);
    }
}
