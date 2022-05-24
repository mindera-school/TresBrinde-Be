import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ProductEntity} from "./product.entity";

@Entity()
export class PriceQuantityEntity {
    constructor(partial: Partial<PriceQuantityEntity> = {}) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => ProductEntity,
        (productEntity: ProductEntity) => productEntity.priceQuantities
    )
    @JoinColumn()
    product: ProductEntity;

    @Column()
    quantity: number;

    @Column({type: 'numeric', precision: 10, scale: 2})
    unitPrice: number;

}