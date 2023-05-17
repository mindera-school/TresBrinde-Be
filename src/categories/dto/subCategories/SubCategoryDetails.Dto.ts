import { ApiProperty } from "@nestjs/swagger";
import { CategoryEntity } from "../../entities/category.entity";
import { ProductEntity } from "../../../products/entities/product.entity";

export class SubCategoryDetailsDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: () => [ProductEntity] })
  products: ProductEntity[];

  @ApiProperty()
  mainCategory: CategoryEntity;

  constructor(partial: Partial<SubCategoryDetailsDto>) {
    Object.assign(this, partial);
  }
}
