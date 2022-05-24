import {Injectable} from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";
import {BudgetEntity} from "../entities/budget.entity";

@Injectable()
@EntityRepository(BudgetEntity)
export class BudgetRepository extends Repository<BudgetEntity> {

    async paginateBudgets(email: string, limit: number, page: number) {
        return this.createQueryBuilder('BE')
            .leftJoinAndSelect("BE.images", "BIE")
            .leftJoinAndSelect("BE.products", "BPE")
            .leftJoinAndSelect("BPE.product", "PE")
            .where(`BE.email = '${email}'`)
            .take(limit)
            .skip(limit * (page - 1))
            .getMany()
    }
}