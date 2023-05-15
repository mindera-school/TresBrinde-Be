import { ApiProperty } from "@nestjs/swagger";
import { CategoryDetailsDto } from "./CategoryDetails.Dto";

export class PaginatedCategoriesDto {
  @ApiProperty({ type: () => [CategoryDetailsDto] })
  categories: CategoryDetailsDto[];
}
