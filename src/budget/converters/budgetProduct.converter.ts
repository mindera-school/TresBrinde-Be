import {BudgetProductEntity} from "../entities/budgetProduct.entity";
import {BudgetEntity} from "../entities/budget.entity";
import {ProductEntity} from "../../products/entities/product.entity";
import {Builder} from "ts-generic-builder";
import {BudgetProductDetailsDto} from "../dto/budgetProduct/budgetProductDetails.dto";

export class BudgetProductConverter {
    static fromCreateBudgetProductToBudgetProductEntity(
        budgetEntity: BudgetEntity,
        productEntity: ProductEntity,
        quantity: number
    ): BudgetProductEntity {
        return new Builder(BudgetProductEntity)
            .with({
                id: null,
                budget: budgetEntity,
                product: productEntity,
                quantity: quantity
            })
            .build()
    }

    static fromBudgetProductEntityToBudgetProductDetailsDto(budgetProductEntity: BudgetProductEntity) {
        return new Builder(BudgetProductDetailsDto)
            .with({
                id: budgetProductEntity.id,
                quantity: budgetProductEntity.quantity,
                productId: budgetProductEntity.product.id,
            })
            .build()
    }
}