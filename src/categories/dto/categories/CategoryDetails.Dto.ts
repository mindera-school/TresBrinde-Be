import { ApiProperty } from "@nestjs/swagger";
import { SubCategoryEntity } from "../../entities/subCategory.entity";

export class CategoryDetailsDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: () => [SubCategoryEntity] })
  subCategories: SubCategoryEntity[];

  @ApiProperty({ required: false })
  image?: string;

  constructor(partial: Partial<CategoryDetailsDto>) {
    Object.assign(this, partial);
  }
}
