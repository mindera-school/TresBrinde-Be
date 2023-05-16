import {OPERATION_FAILED, USERALREADYEXISTSEXCEPTION, WRONGCREDETIALSEXCEPTION} from "../constants";
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt'
import {DetailsUserDto} from "../user/dto/details-user.dto";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {PrincipalDto} from "./dto/principal.dto";
import {Builder} from "ts-generic-builder";
import {UserEntity} from "../user/entities/user.entity";
import {UserRole} from "../user/userRole.enum";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
    }

    public async registerAdmin(createUserDto: CreateUserDto): Promise<DetailsUserDto> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        createUserDto.role = UserRole.Admin;

        try {
            const createdUser: DetailsUserDto = await this.usersService.create({
                ...createUserDto,
                password: hashedPassword
            });
            createdUser.password = "";
            return createdUser;
        } catch (error) {
            if (error.response === USERALREADYEXISTSEXCEPTION) {
                throw new HttpException(
                  OPERATION_FAILED,
                  HttpStatus.BAD_REQUEST
                );
            }
            throw new HttpException(OPERATION_FAILED, HttpStatus.BAD_REQUEST);
        }
    }

    public async register(createUserDto: CreateUserDto): Promise<DetailsUserDto> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        createUserDto.role = UserRole.User;

        try {
            const createdUser: DetailsUserDto = await this.usersService.create({
                ...createUserDto,
                password: hashedPassword
            });
            createdUser.password = "";
            return createdUser;
        } catch (error) {
            if (error.response === USERALREADYEXISTSEXCEPTION) {
                throw new HttpException(
                  OPERATION_FAILED,
                  HttpStatus.BAD_REQUEST
                );
            }
            throw new HttpException(OPERATION_FAILED, HttpStatus.BAD_REQUEST);
        }

    }

    public async getAuthenticatedUser(email: string, password: string): Promise<DetailsUserDto> {
        try {
            const user: UserEntity = await this.usersService.findByEmail(email);
            await this.verifyPassword(password, user.password);

            user.password = undefined;
            return user;
        } catch (error) {
            throw new HttpException(WRONGCREDETIALSEXCEPTION, HttpStatus.UNAUTHORIZED);
        }
    }

    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(
            plainTextPassword,
            hashedPassword
        );

        if (!isPasswordMatching) {
            throw new HttpException(WRONGCREDETIALSEXCEPTION, HttpStatus.UNAUTHORIZED);
        }
    }

    public async getPrincipalDto(email: string) {
        const user: UserEntity = await this.usersService.findByEmail(email);

        const payload: PrincipalDto = new Builder(PrincipalDto)
            .with({id: user.id})
            .with({email: email})
            .with({role: user.role})
            .with({jwtToken: null})
            .with({name: user.name})
            .build()

        payload.jwtToken = this.jwtService.sign({payload});

        return payload;

    }
}
