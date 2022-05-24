import {DomainBuilder} from "ts-generic-builder";
import {UserRole} from "../userRole.enum";

interface userDetailsDtoProps {
    id: number;
    email: string;
    password?: string;
    role: UserRole;
    NIF: string;
    company_name: string;
    name: string;
    country: string;
    postal_code: string;
    city: string;
    address: string;
    contact: string;
}

export class DetailsUserDto implements userDetailsDtoProps {

    id: number;
    NIF: string;
    address: string;
    city: string;
    company_name: string;
    contact: string;
    country: string;
    email: string;
    name: string;
    password?: string;
    postal_code: string;
    role: UserRole;

    constructor(builder: DomainBuilder<userDetailsDtoProps, DetailsUserDto> & userDetailsDtoProps) {
        this.id = builder.id;
        this.NIF = builder.NIF;
        this.address = builder.address;
        this.city = builder.city;
        this.company_name = builder.company_name;
        this.contact = builder.contact;
        this.country = builder.country;
        this.email = builder.email;
        this.name = builder.name;
        this.password = "";
        this.postal_code = builder.postal_code;
        this.role = builder.role
    }


}