import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UserConverter} from "./user.converter";
import {DATABASECONNECTIONEXCEPTION, USERALREADYEXISTSEXCEPTION, USERNOTFOUNDEXCEPTION} from "../constants";
import {InjectRepository} from "@nestjs/typeorm";
import {PaginatedUsersDto} from "./dto/paginated-users.Dto";
import {DetailsUserDto} from "./dto/details-user.dto";
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {UserRepository} from "./user.repository";
import {UserEntity} from "./entities/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
    }

    async create(createUserDto: CreateUserDto): Promise<DetailsUserDto> {
        if (await this.userRepository.findOne({where: {email: createUserDto.email}})) {
            throw new HttpException(USERALREADYEXISTSEXCEPTION, HttpStatus.CONFLICT)
        }

        let userEntity: UserEntity = UserConverter.fromCreateUserDtoToUserEntity(createUserDto);

        try {
            userEntity = await this.userRepository.save(userEntity)
        } catch (e) {
            throw new HttpException(DATABASECONNECTIONEXCEPTION, HttpStatus.BAD_REQUEST);
        }

        return UserConverter.fromUserEntityToUserDetailsDto(userEntity);
    }

    async findAll(limit: number, page: number): Promise<PaginatedUsersDto> {
        const userEntities: UserEntity[] = await this.userRepository.getPaginatedUsers(limit, page)

        let paginatedUsers: PaginatedUsersDto = new PaginatedUsersDto()
        paginatedUsers.users = []

        for (const element of userEntities) {
            paginatedUsers.users.push(await UserConverter.fromUserEntityToUserDetailsDto(element))
        }

        return paginatedUsers;
    }

    async findByEmail(email: string): Promise<UserEntity> {
        const userEntity: UserEntity = await this.userRepository.findOne({where: {email: email}})

        if (!userEntity) {
            throw new HttpException(USERNOTFOUNDEXCEPTION, HttpStatus.NOT_FOUND)
        }

        return userEntity
    }

    async findOne(id: number): Promise<DetailsUserDto> {
        const userEntity: UserEntity = await this.userRepository.findOne({where: {id: id}})

        if (!userEntity) {
            throw new HttpException(USERNOTFOUNDEXCEPTION, HttpStatus.NOT_FOUND)
        }

        return UserConverter.fromUserEntityToUserDetailsDto(userEntity);
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const user: UserEntity = await this.userRepository.findOne({where: {id: id}})

        if (!user) {
            throw new HttpException(USERNOTFOUNDEXCEPTION, HttpStatus.NOT_FOUND)
        }

        let userEntity: UserEntity = UserConverter.fromUpdateUserDtoToUserEntity(id, updateUserDto, user);

        try {
            userEntity = await this.userRepository.save(userEntity)
        } catch (e) {
            throw new HttpException(DATABASECONNECTIONEXCEPTION, HttpStatus.BAD_REQUEST);
        }

        return UserConverter.fromUserEntityToUserDetailsDto(userEntity)
    }

    async remove(id: number) {
        await this.findOne(id)

        return this.userRepository.delete(id)
            .then(() => ({statusCode: HttpStatus.OK}))
            .catch(() => ({statusCode: HttpStatus.NOT_MODIFIED}))

    }
}
