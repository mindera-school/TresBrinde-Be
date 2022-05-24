import {BudgetEntity} from "../entities/budget.entity";
import {Builder} from "ts-generic-builder";
import {BudgetImageEntity} from "../entities/budgetImage.entity";

export class BudgetImageConverter {

    static fromCreateBudgetImageDtoToBudgetEntity(path: string, budgetEntity: BudgetEntity): BudgetImageEntity {
        return new Builder(BudgetImageEntity)
            .with({
                id:null,
                path:path,
                budget:budgetEntity
            })
            .build()

    }
}