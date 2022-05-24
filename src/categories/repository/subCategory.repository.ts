import {Injectable} from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";
import {SubCategoryEntity} from "../entities/subCategory.entity";

@Injectable()
@EntityRepository(SubCategoryEntity)
export class SubCategoryRepository extends Repository<SubCategoryEntity> {
    getPaginatedSubCategories(categoryId: number, limit: number, page: number) {
        return this.createQueryBuilder('SCE')
            .leftJoinAndSelect("SCE.mainCategory", "CE")
            .where(categoryId ? `SCE.mainCategory=${categoryId}` : `1=1`)
            .take(limit)
            .skip(limit * (page - 1))
            .orderBy("SCE.id")
            .getMany()
    }

}