import {UserRole} from "../userRole.enum";
import {UserEntity} from "../entities/user.entity";
import {Builder} from "ts-generic-builder";
import {UpdateUserDto} from "../dto/update-user.dto";
import {CreateUserDto} from "../dto/create-user.dto";
import {DetailsUserDto} from "../dto/details-user.dto";
/*
export module userMocks {
    export function getMockedUserEntity(userRole: UserRole): UserEntity {
        return new Builder(UserEntity)
            .with({id: 1})
            .with({NIF: ""})
            .with({email: "example@example.com"})
            .with({address: "rua das bananas nº7"})
            .with({city: "Aveiro"})
            .with({company_name: ""})
            .with({contact: "912345678"})
            .with({country: "Portugal"})
            .with({name: "Joe Test",})
            .with({password: "password"})
            .with({postal_code: "1234567"})
            .with({role: userRole})
            .build();
    }

    export function getMockedUserUpdateDto(userRole: UserRole): UpdateUserDto {
        return new Builder(UpdateUserDto)
            .with({NIF: ""})
            .with({email: "example@example.com"})
            .with({address: "rua das bananas nº7"})
            .with({city: "Aveiro"})
            .with({company_name: ""})
            .with({contact: "912345678"})
            .with({country: "Portugal"})
            .with({name: "Joe Test",})
            .with({password: "password"})
            .with({postal_code: "1234567"})
            .with({role: userRole})
            .build();
    }

    export function getMockedUserCreateDto(userRole: UserRole): CreateUserDto {
        return new Builder(CreateUserDto)
            .with({NIF: ""})
            .with({email: "example@example.com"})
            .with({address: "rua das bananas nº7"})
            .with({city: "Aveiro"})
            .with({company_name: ""})
            .with({contact: "912345678"})
            .with({country: "Portugal"})
            .with({name: "Joe Test",})
            .with({password: "password"})
            .with({postal_code: "1234567"})
            .with({role: userRole})
            .build();
    }

    export function getMockedUserDetailsDtoList(userRole: UserRole): DetailsUserDto[] {
        return [getMockedUserDetailsDto(userRole)]
    }

    export function getMockedUserDetailsDto(userRole: UserRole): DetailsUserDto {
        return new Builder(DetailsUserDto)
            .with({id: 1})
            .with({NIF: ""})
            .with({email: "example@example.com"})
            .with({address: "rua das bananas nº7"})
            .with({city: "Aveiro"})
            .with({company_name: ""})
            .with({contact: "912345678"})
            .with({country: "Portugal"})
            .with({name: "Joe Test",})
            .with({password: ""})
            .with({postal_code: "1234567"})
            .with({role: userRole})
            .build();
    }

    export function getMockedUpdatedUserDetailsDto(userRole: UserRole): DetailsUserDto {
        return new Builder(DetailsUserDto)
            .with({id: 1})
            .with({NIF: ""})
            .with({email: "exampleUpdated@example.com"})
            .with({address: "rua das bananas nº7"})
            .with({city: "Aveiro"})
            .with({company_name: ""})
            .with({contact: "912345678"})
            .with({country: "Portugal"})
            .with({name: "Joe Test with Update",})
            .with({password: "passwordUpdated"})
            .with({postal_code: "1234567"})
            .with({role: userRole})
            .build();
    }
}
*/

