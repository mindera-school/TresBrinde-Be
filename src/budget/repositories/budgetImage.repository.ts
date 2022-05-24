import {Injectable} from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";
import {BudgetImageEntity} from "../entities/budgetImage.entity";

@Injectable()
@EntityRepository(BudgetImageEntity)
export class BudgetImageRepository extends Repository<BudgetImageEntity> {

}