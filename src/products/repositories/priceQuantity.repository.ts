import {EntityRepository, Repository} from "typeorm";
import {PriceQuantityEntity} from "../entities/priceQuantity.entity";

@EntityRepository(PriceQuantityEntity)
export class PriceQuantityRepository extends Repository<PriceQuantityEntity> {
}