import {EntityRepository, Repository} from "typeorm";
import {PropertyEntity} from "../entities/property.entity";

@EntityRepository(PropertyEntity)
export class PropertyRepository extends Repository<PropertyEntity> {
}