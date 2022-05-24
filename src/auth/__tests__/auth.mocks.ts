import {Builder} from "ts-generic-builder";
import LogInDto from "../dto/login.dto";
import {UserRole} from "../../user/userRole.enum";

export module AuthMocks {

    export const mockedConfigService = {
        get(key: string) {
            switch (key) {
                case 'JWT_EXPIRATION_TIME':
                    return '3600'
            }
        }
    }
    export const mockedJwtService = {
        sign: () => ''
    }

    export const getMockedLogInDto = () => {
        return new Builder(LogInDto)
            .with({email: "example@example.com"})
            .with({password: "password"})
            .build();
    }

    export const getMockedUserCreateDto = () => {
        return {
            email: "example@example.com",
            password: "example",
            NIF: "",
            company_name: "",
            name: "Joe Test",
            country: "Portugal",
            postal_code: "1234567",
            city: "Aveiro",
            address: "Rua das bananas Nº7 ",
            contact: "912345678"
        }
    }

    export const getMockedUserDetailsDto = () => {
        return {
            id: 1,
            NIF: "",
            email: "example@example.com",
            address: "rua das bananas nº7",
            city: "Aveiro",
            company_name: "",
            contact: "912345678",
            country: "Portugal",
            name: "Joe Test",
            password: "",
            postal_code: "1234567",
            role: UserRole.User,
        }
    }
}
