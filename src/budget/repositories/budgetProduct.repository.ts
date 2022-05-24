import {Injectable} from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";
import {BudgetProductEntity} from "../entities/budgetProduct.entity";

@Injectable()
@EntityRepository(BudgetProductEntity)
export class BudgetProductRepository extends Repository<BudgetProductEntity> {

}