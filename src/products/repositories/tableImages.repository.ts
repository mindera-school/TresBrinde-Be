import {EntityRepository, Repository} from "typeorm";
import {TableImagesEntity} from "../entities/tableImages.entity";

@EntityRepository(TableImagesEntity)
export class TableImagesRepository extends Repository<TableImagesEntity> {
}