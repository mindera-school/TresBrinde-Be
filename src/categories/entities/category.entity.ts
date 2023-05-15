import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubCategoryEntity } from "./subCategory.entity";

@Entity()
export class CategoryEntity {
  constructor(partial: Partial<CategoryEntity> = {}) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  @ApiProperty({ description: "Category ID" })
  id: number;

  @Column({ length: 60 })
  @ApiProperty({ description: "Category Name", maxLength: 60 })
  name: string;

  @Column({ length: 200, nullable: true })
  @ApiProperty({
    description: "Category Description",
    maxLength: 200,
    required: false,
  })
  description?: string;

  @OneToMany(
    () => SubCategoryEntity,
    (subCategoryEntity: SubCategoryEntity) => subCategoryEntity.mainCategory
  )
  public subCategories: SubCategoryEntity[];

  @Column({ length: 150, nullable: true })
  @ApiProperty({
    description: "Category Image URL",
    maxLength: 150,
    required: false,
  })
  image?: string;
}
