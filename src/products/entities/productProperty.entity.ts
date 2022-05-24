import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ProductEntity} from "./product.entity";
import {PropertyEntity} from "./property.entity";

@Entity()
export class ProductPropertyEntity {
    constructor(partial: Partial<PropertyEntity> = {}) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => ProductEntity,
        (productEntity: ProductEntity) =>
            productEntity.productProperties
    )
    @JoinColumn()
    product: ProductEntity;

    @ManyToOne(
        () => PropertyEntity,
        (propertyEntity: PropertyEntity) => propertyEntity.productProperty
    )
    @JoinColumn()
    property: PropertyEntity;

    @Column({length: 300})
    value: string;

    @Column({length: 300, nullable: true})
    image?: string;
}
