/*
import {AuthService} from "../auth.service";
import {Test} from '@nestjs/testing';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import {getRepositoryToken} from '@nestjs/typeorm';
import {AuthMocks} from "./auth.mocks";
import {INestApplication, ValidationPipe} from '@nestjs/common';
import * as request from 'supertest';
import {UserRole} from "../../user/userRole.enum";
import {AuthController} from "../auth.controller";
import {UserService} from "../../user/user.service";
import {UserRepository} from "../../user/user.repository";
import {userMocks} from "../../user/__tests__/user.mocks";
import getMockedUserDetailsDto = userMocks.getMockedUserDetailsDto;

describe('The AuthenticationController', () => {
    let app: INestApplication;
    let expectedData = getMockedUserDetailsDto(UserRole.User)
    beforeEach(async () => {
        const usersRepository = {
            save: jest.fn().mockResolvedValue(AuthMocks.getMockedUserDetailsDto()),
            findOne: jest.fn().mockReturnValue(null),
        }

        const module = await Test.createTestingModule({
            controllers: [AuthController],
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
                    useValue: usersRepository
                }
            ],
        }).compile();

        app = module.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    })
    describe('when registering', () => {
        describe('and using valid data', () => {
            it('should respond with the data of the user without the password', () => {
                return request(app.getHttpServer())
                    .post('/Auth/register').send(AuthMocks.getMockedUserCreateDto())
                    .expect(201)
                    .expect(JSON.stringify(expectedData));
            })
        })

        describe('and using invalid data', () => {
            it('should throw an error', () => {
                return request(app.getHttpServer())
                    .post('/Auth/register').send(AuthMocks.getMockedLogInDto())
                    .expect(400)
            })
        })
    })
});*/