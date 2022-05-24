import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {BudgetEntity} from "./budget.entity";
import {ProductEntity} from "../../products/entities/product.entity";

@Entity()
export class BudgetProductEntity {
    constructor(partial: Partial<BudgetProductEntity> = {}) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => BudgetEntity,
        (budgetEntity: BudgetEntity) => budgetEntity.products,
        {onDelete: 'CASCADE'}
    )
    budget: BudgetEntity;

    @ManyToOne(
        () => ProductEntity,
        (productEntity: ProductEntity) => productEntity.budgets,
        {eager: true, onDelete: 'CASCADE'}
    )
    product: ProductEntity;

    @Column({nullable: false})
    quantity: number;


}