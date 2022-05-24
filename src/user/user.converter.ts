import {Builder} from "ts-generic-builder";
import {DetailsUserDto} from "./dto/details-user.dto";
import {UserEntity} from "./entities/user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

export class UserConverter {
    static fromUserEntityToUserDetailsDto(userEntity: UserEntity): DetailsUserDto {
        return new Builder(DetailsUserDto)
            .with({
                id: userEntity.id,
                city: userEntity.city,
                name: userEntity.name,
                role: userEntity.role,
                email: userEntity.email,
                address: userEntity.address,
                contact: userEntity.contact,
                country: userEntity.country,
                password: "",
                postal_code: userEntity.postal_code,
                NIF: userEntity.NIF ? userEntity.NIF : "",
                company_name: userEntity.company_name ? userEntity.company_name : "",
            })
            .build();
    }

    static fromUpdateUserDtoToUserEntity(id: number, updateUserDto: UpdateUserDto, user: UserEntity): UserEntity {
        return new Builder(UserEntity)
            .with({
                id: id,
                role: user.role,
                email: user.email,
                password: user.password,
                city: updateUserDto.city,
                name: updateUserDto.name,
                address: updateUserDto.address,
                contact: updateUserDto.contact,
                country: updateUserDto.country,
                postal_code: updateUserDto.postal_code,
                NIF: updateUserDto.NIF ? updateUserDto.NIF : "",
                company_name: updateUserDto.company_name ? updateUserDto.company_name : "",
            })
    }


    static fromCreateUserDtoToUserEntity(createUserDto: CreateUserDto): UserEntity {
        return new Builder(UserEntity)
            .with({
                id: null,
                city: createUserDto.city,
                name: createUserDto.name,
                role: createUserDto.role,
                email: createUserDto.email,
                address: createUserDto.address,
                contact: createUserDto.contact,
                country: createUserDto.country,
                password: createUserDto.password,
                postal_code: createUserDto.postal_code,
                NIF: createUserDto.NIF ? createUserDto.NIF : "",
                company_name: createUserDto.company_name ? createUserDto.company_name : "",
            })
            .build()
    }
}


