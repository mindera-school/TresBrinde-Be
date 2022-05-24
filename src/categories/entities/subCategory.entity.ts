import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {CategoryEntity} from "./category.entity";
import {ProductEntity} from "../../products/entities/product.entity";

@Entity()
export class SubCategoryEntity {
    constructor(partial: Partial<SubCategoryEntity> = {}) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 60})
    name: string;

    @ManyToOne(
        () => CategoryEntity,
        (categoryEntity: CategoryEntity) => categoryEntity.subCategories,
        {onDelete: 'CASCADE'}
    )
    mainCategory: CategoryEntity;

    @ManyToMany(
        () => ProductEntity,
        (productEntity: ProductEntity) => productEntity.subCategories,
        {onDelete: 'CASCADE',}
    )
    products: ProductEntity[];
}