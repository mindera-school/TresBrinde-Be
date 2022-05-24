import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {BudgetProductRepository} from "../repositories/budgetProduct.repository";
import {QueryRunner} from "typeorm";
import {BudgetEntity} from "../entities/budget.entity";
import {ProductEntity} from "../../products/entities/product.entity";
import {BudgetProductConverter} from "../converters/budgetProduct.converter";
import {DATABASECONNECTIONEXCEPTION} from "../../constants";
import {CreateProductBudgetDto} from "../dto/budgetProduct/createProductBudget.dto";
import {BudgetProductEntity} from "../entities/budgetProduct.entity";

@Injectable()
export class BudgetProductService {
    constructor(
        @InjectRepository(BudgetProductRepository)
        private budgetProductRepository: BudgetProductRepository,
    ) {
    }

    async create(queryRunner: QueryRunner, budgetEntity: BudgetEntity, quantity: number, productEntity: ProductEntity) {
        try {
            return BudgetProductConverter.fromBudgetProductEntityToBudgetProductDetailsDto(
                await queryRunner.manager.save(
                    BudgetProductConverter.fromCreateBudgetProductToBudgetProductEntity(budgetEntity, productEntity, quantity)
                )
            )
        } catch (e) {
            await queryRunner.rollbackTransaction()
            throw new HttpException(DATABASECONNECTIONEXCEPTION, HttpStatus.BAD_REQUEST)
        }
    }
}
