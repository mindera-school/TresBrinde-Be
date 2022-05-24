import {DomainBuilder} from "ts-generic-builder";
import {UserRole} from "../../user/userRole.enum";

interface principalDtoProps {
    id: number;
    email: string;
    role: UserRole;
    jwtToken: string;
    name: string;
}

export class PrincipalDto implements principalDtoProps {

    id: number;
    email: string;
    role: UserRole;
    jwtToken: string;
    name: string;

    constructor(builder: DomainBuilder<principalDtoProps, PrincipalDto> & principalDtoProps) {
        this.id = builder.id;
        this.email = builder.email;
        this.role = builder.role;
        this.jwtToken = builder.jwtToken;
        this.name = builder.name;
    }


}