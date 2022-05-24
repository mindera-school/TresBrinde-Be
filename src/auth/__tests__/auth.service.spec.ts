/*import {JwtService} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';
import {AuthService} from "../auth.service";
import {UserService} from "../../user/user.service";
import {Test} from "@nestjs/testing";
import {getRepositoryToken} from "@nestjs/typeorm";
import {UserRepository} from "../../user/user.repository";
import {userMocks} from "../../user/__tests__/user.mocks";
import {UserRole} from "../../user/userRole.enum";
import {AuthMocks} from "./auth.mocks";

describe('The AuthenticationService', () => {
    let authService: AuthService;
    let userService: UserService;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UserService,
                AuthService,
                {
                    provide: ConfigService,
                    useValue: AuthMocks.mockedConfigService
                },
                {
                    provide: JwtService,
                    useValue: AuthMocks.mockedJwtService
                },
                {
                    provide: getRepositoryToken(UserRepository),
                    useValue: {}
                }
            ],
        }).compile();
        userService = module.get<UserService>(UserService);
        authService = await module.get<AuthService>(AuthService);
    })
    describe('when creating a token', () => {
        it('should return a string', async () => {
            //mocks
            jest.spyOn(userService, 'findByEmail').mockResolvedValue(userMocks.getMockedUserDetailsDto(UserRole.User))
            const email = "example@example.com"

            expect(typeof await authService.getPrincipalDto(email)).toEqual('string')
        })
    })
});*/