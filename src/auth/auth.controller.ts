import {Body, Controller, HttpCode, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import LogInDto from "./dto/login.dto";
import {Public} from "../decorators/public.decorator";
import {Roles} from "../decorators/roles.decorator";
import {UserRole} from "../user/userRole.enum";
import {LocalAuthenticationGuard} from "./guards/localAuth.guard";

@ApiTags("Auth")
@Controller('Auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {
    }

    @Post('registerAdmin')
    @ApiBearerAuth("JWT-auth")
    @ApiOperation({summary: 'Register a new admin'})
    @Roles(UserRole.Admin)
    async registerAdmin(@Body() registrationData: CreateUserDto) {
        return await this.authService.registerAdmin(registrationData);
    }

    @Public()
    @Roles()
    @Post('register')
    @ApiOperation({summary: 'Register a new user'})
    async register(@Body() registrationData: CreateUserDto) {
        return await this.authService.register(registrationData);
    }

    @Public()
    @Roles()
    @Post('log-in')
    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @ApiOperation({summary: 'Log in user'})
    async logIn(@Body() logInDto: LogInDto) {
        return this.authService.getPrincipalDto(logInDto.email);
    }
}
