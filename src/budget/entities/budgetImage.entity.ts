import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {BudgetEntity} from "./budget.entity";

@Entity()
export class BudgetImageEntity {
    constructor(partial: Partial<BudgetImageEntity> = {}) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 300})
    path: string;

    @ManyToOne(
        () => BudgetEntity,
        (budgetEntity: BudgetEntity) => budgetEntity.images,
        {onDelete: 'CASCADE'}
    )
    budget: BudgetEntity;
}