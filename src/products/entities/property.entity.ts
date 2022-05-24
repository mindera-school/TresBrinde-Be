import {Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ProductPropertyEntity} from "./productProperty.entity";

@Entity()
export class PropertyEntity {
    constructor(partial: Partial<PropertyEntity> = {}) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(
        () => ProductPropertyEntity,
        (productPropertyEntity: ProductPropertyEntity) => {
            productPropertyEntity.property
        }
    )
    @JoinTable()
    productProperty: ProductPropertyEntity;

    @Column({length: 300})
    name: string;
}