import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {BudgetImageRepository} from "../repositories/budgetImage.repository";
import {BudgetEntity} from "../entities/budget.entity";
import {BudgetImageEntity} from "../entities/budgetImage.entity";
import {BudgetImageConverter} from "../converters/budgetImage.converter";

@Injectable()
export class BudgetImageService {
    constructor(
        @InjectRepository(BudgetImageRepository)
        private budgetImageRepository: BudgetImageRepository,
    ) {
    }

    async addImage(budgetEntity: BudgetEntity, path: string) {

        const budgetImageEntity: BudgetImageEntity = BudgetImageConverter
            .fromCreateBudgetImageDtoToBudgetEntity(path, budgetEntity)

        return await this.budgetImageRepository.save(budgetImageEntity)
    }
}