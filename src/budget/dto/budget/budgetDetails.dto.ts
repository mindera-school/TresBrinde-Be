import {DomainBuilder} from "ts-generic-builder";
import {BudgetProductDetailsDto} from "../budgetProduct/budgetProductDetails.dto";

interface BudgetDetailsDtoProps {
    id: number;
    NIF: string;
    city: string;
    name: string;
    email: string;
    country: string;
    address: string;
    contact: string;
    images?: string[];
    postal_code: string;
    description: string;
    company_name: string;
    expectedPrice: number;
    budgetProducts: BudgetProductDetailsDto[]
}

export class BudgetDetailsDto implements BudgetDetailsDtoProps {
    constructor(builder: DomainBuilder<BudgetDetailsDtoProps, BudgetDetailsDto> & BudgetDetailsDtoProps) {
        this.id = builder.id;
        this.NIF = builder.NIF;
        this.city = builder.city;
        this.email = builder.email;
        this.images = builder.images;
        this.address = builder.address;
        this.contact = builder.contact;
        this.country = builder.country;
        this.description = builder.description;
        this.postal_code = builder.postal_code;
        this.company_name = builder.company_name;
        this.expectedPrice = builder.expectedPrice;
        this.budgetProducts = builder.budgetProducts;
    }

    id: number;
    NIF: string;
    city: string;
    name: string;
    email: string;
    address: string;
    country: string;
    contact: string;
    images?: string[];
    description: string;
    postal_code: string;
    company_name: string;
    expectedPrice: number;
    budgetProducts: BudgetProductDetailsDto[];

}