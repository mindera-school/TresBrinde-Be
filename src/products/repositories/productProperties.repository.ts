import {EntityRepository, Repository} from "typeorm";
import {ProductPropertyEntity} from "../entities/productProperty.entity";

@EntityRepository(ProductPropertyEntity)
export class ProductPropertyRepository extends Repository<ProductPropertyEntity> {
}