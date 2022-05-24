import {Injectable} from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";
import {CategoryEntity} from "../entities/category.entity";

@Injectable()
@EntityRepository(CategoryEntity)
export class CategoryRepository extends Repository<CategoryEntity> {
    getPaginatedCategories(limit: number, page: number) {
        return this.createQueryBuilder('CE')
            .leftJoinAndSelect("CE.subCategories", "SCE")
            .take(limit)
            .skip(limit * (page - 1))
            .getMany()
    }

}