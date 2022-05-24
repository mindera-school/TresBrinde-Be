import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ProductEntity} from "./product.entity";

@Entity()
export class TableImagesEntity {
    constructor(partial: Partial<TableImagesEntity> = {}) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => ProductEntity,
        (productEntity: ProductEntity) => productEntity.tableImages
    )
    product: ProductEntity;

    @Column({length: 300})
    image: string;
}