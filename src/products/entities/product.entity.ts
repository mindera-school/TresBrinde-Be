import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {SubCategoryEntity} from "../../categories/entities/subCategory.entity";
import {PriceQuantityEntity} from "./priceQuantity.entity";
import {ProductPropertyEntity} from "./productProperty.entity";
import {TableImagesEntity} from "./tableImages.entity";
import {BudgetProductEntity} from "../../budget/entities/budgetProduct.entity";

@Entity()
export class ProductEntity {
    constructor(partial: Partial<ProductEntity> = {}) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 20})
    reference: string;

    @Column({length: 10})
    catalogReference: string;

    @Column({length: 40})
    productName: string;

    @Column({length: 600})
    description: string;

    @Column({length: 600})
    keywords: string;

    @Column({length: 150, nullable: true})
    mainImage?: string;

    @Column({length: 40})
    brand: string;

    @Column()
    minimumQuantity: number;

    @Column({length: 60})
    material: string;

    @Column({type: 'numeric', precision: 10, scale: 2})
    price: number;

    @ManyToMany(
        () => SubCategoryEntity,
        (subCategoryEntity: SubCategoryEntity) => subCategoryEntity.products,
    )
    @JoinTable({name: "product_subcategory_entity"})
    subCategories?: SubCategoryEntity[];

    @OneToMany(
        () => ProductPropertyEntity,
        (productPropertyEntity: ProductPropertyEntity) => productPropertyEntity.product,
    )
    productProperties?: ProductPropertyEntity[]

    @OneToMany(
        () => PriceQuantityEntity,
        (priceQuantityEntity: PriceQuantityEntity) => priceQuantityEntity.product,
        {onDelete:"CASCADE"}
    )
    priceQuantities?: PriceQuantityEntity[]

    @OneToMany(
        () => TableImagesEntity,
        (tableImagesEntity: TableImagesEntity) => tableImagesEntity.product
    )
    tableImages?: TableImagesEntity[]

    @OneToMany(
        () => BudgetProductEntity,
        (budgetProductEntity: BudgetProductEntity) => budgetProductEntity.product,
        {onDelete:"CASCADE"}
    )
    budgets?: BudgetProductEntity[]
}