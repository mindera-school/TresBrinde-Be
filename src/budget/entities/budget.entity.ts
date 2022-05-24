import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {BudgetImageEntity} from "./budgetImage.entity";
import {BudgetProductEntity} from "./budgetProduct.entity";

@Entity()
export class BudgetEntity {
    constructor(partial: Partial<BudgetEntity> = {}) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 120})
    email: string;

    @Column({length: 60})
    name: string;

    @Column({length: 9, nullable: true})
    NIF: string;

    @Column({length: 100, nullable: true})
    company_name: string;

    @Column({length: 50})
    country: string;

    @Column({length: 7})
    postal_code: string;

    @Column({length: 40})
    city: string;

    @Column({length: 60})
    address: string;

    @Column({length: 9})
    contact: string;

    @Column({type: 'numeric', precision: 10, scale: 2})
    expectedPrice?: number;

    @Column({length: 600})
    description: string;

    @OneToMany(
        () => BudgetProductEntity,
        (budgetProductEntity: BudgetProductEntity) => budgetProductEntity.budget,

    )
    products?: BudgetProductEntity[];

    @OneToMany(
        () => BudgetImageEntity,
        (budgetImageEntity: BudgetImageEntity) => budgetImageEntity.budget,
    )
    images?: BudgetImageEntity[];

}