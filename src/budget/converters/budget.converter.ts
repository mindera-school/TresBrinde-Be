import {DetailsUserDto} from "../../user/dto/details-user.dto";
import {CreateBudgetDto} from "../dto/budget/createBudget.dto";
import {BudgetEntity} from "../entities/budget.entity";
import {Builder} from "ts-generic-builder";
import {BudgetProductDetailsDto} from "../dto/budgetProduct/budgetProductDetails.dto";
import {BudgetDetailsDto} from "../dto/budget/budgetDetails.dto";
import {UpdateBudgetDto} from "../dto/budget/updateBudget.dto";

export class BudgetConverter {
    static fromCreateBudgetDtoToBudgetEntity(
        createBudgetDto: CreateBudgetDto,
        userDetails?: DetailsUserDto,
    ): BudgetEntity {
        if (userDetails) {
            return new Builder(BudgetEntity)
                .with({
                    id: null,
                    NIF: userDetails.NIF,
                    name: userDetails.name,
                    city: userDetails.city,
                    email: userDetails.email,
                    country: userDetails.country,
                    address: userDetails.address,
                    contact: userDetails.contact,
                    postal_code: userDetails.postal_code,
                    company_name: userDetails.company_name,
                    description: createBudgetDto.description,
                    expectedPrice: createBudgetDto.expectedPrice,
                })
                .build()
        } else {
            return new Builder(BudgetEntity)
                .with({
                    id: null,
                    NIF: createBudgetDto.NIF,
                    name: createBudgetDto.name,
                    city: createBudgetDto.city,
                    email: createBudgetDto.email,
                    country: createBudgetDto.country,
                    address: createBudgetDto.address,
                    contact: createBudgetDto.contact,
                    postal_code: createBudgetDto.postal_code,
                    description: createBudgetDto.description,
                    company_name: createBudgetDto.company_name,
                    expectedPrice: createBudgetDto.expectedPrice,
                })
                .build()
        }

    }

    static fromBudgetEntityToBudgetDetailsDto(
        budgetEntity: BudgetEntity,
        budgetProductDetailsDtoList: BudgetProductDetailsDto[],
        budgetImages?: string[],
    ): BudgetDetailsDto {
        return new Builder(BudgetDetailsDto)
            .with({
                images: budgetImages,
                id: budgetEntity.id,
                NIF: budgetEntity.NIF,
                city: budgetEntity.city,
                name: budgetEntity.name,
                email: budgetEntity.email,
                country: budgetEntity.country,
                address: budgetEntity.address,
                contact: budgetEntity.contact,
                postal_code: budgetEntity.postal_code,
                description: budgetEntity.description,
                company_name: budgetEntity.company_name,
                expectedPrice: budgetEntity.expectedPrice,
                budgetProducts: budgetProductDetailsDtoList,
            })
            .build()
    }

    static fromUpdateBudgetDtoToBudgetEntity(id: number, updateBudgetDto: UpdateBudgetDto): BudgetEntity {
        return new Builder(BudgetEntity)
            .with({
                id: id,
                NIF: updateBudgetDto.NIF,
                city: updateBudgetDto.city,
                name: updateBudgetDto.name,
                email: updateBudgetDto.email,
                country: updateBudgetDto.country,
                address: updateBudgetDto.address,
                contact: updateBudgetDto.contact,
                postal_code: updateBudgetDto.postal_code,
                description: updateBudgetDto.description,
                company_name: updateBudgetDto.company_name,
                expectedPrice: updateBudgetDto.expectedPrice,
                images: null,
            })
            .build()

    }
}