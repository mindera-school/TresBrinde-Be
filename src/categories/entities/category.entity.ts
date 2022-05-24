import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {SubCategoryEntity} from "./subCategory.entity";

@Entity()
export class CategoryEntity {
    constructor(partial: Partial<CategoryEntity> = {}) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 60})
    name: string;

    @OneToMany(
        () => SubCategoryEntity,
        (subCategoryEntity: SubCategoryEntity) => subCategoryEntity.mainCategory,
    )
    public subCategories: SubCategoryEntity[];

    @Column({length: 150, nullable: true})
    image?: string

}