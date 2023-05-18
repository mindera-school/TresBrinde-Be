import { ApiProperty } from "@nestjs/swagger";
import {SubCategoryDetailsDto} from "./SubCategoryDetails.Dto";

export class PaginatedSubCategoriesDto {
  @ApiProperty({ type: () => [SubCategoryDetailsDto] })
  subCategories: SubCategoryDetailsDto[];
}