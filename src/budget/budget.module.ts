import {Module} from "@nestjs/common";
import {BudgetController} from "./budget.controller";
import {BudgetService} from "./services/budget.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "../user/user.module";
import {ProductModule} from "../products/product.module";
import {BudgetRepository} from "./repositories/budget.repository";
import {BudgetProductRepository} from "./repositories/budgetProduct.repository";
import {BudgetImageRepository} from "./repositories/budgetImage.repository";
import {BudgetProductService} from "./services/budgetProduct.service";
import {BudgetImageService} from "./services/budgetImage.service";


@Module({
    imports: [
        UserModule,
        ProductModule,
        TypeOrmModule.forFeature(
            [
                BudgetRepository,
                BudgetImageRepository,
                BudgetProductRepository
            ]
        ),
    ],
    controllers: [BudgetController],
    providers: [BudgetService, BudgetProductService, BudgetImageService],
    exports: [BudgetService]
})

export class BudgetModule {
}