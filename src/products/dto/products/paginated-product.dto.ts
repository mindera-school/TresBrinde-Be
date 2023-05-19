import { ApiProperty } from "@nestjs/swagger";
import {ProductDetailsDto} from "./product-details.dto";

export class PaginatedProductDto {
  @ApiProperty({ type: () => [ProductDetailsDto] })
  products: ProductDetailsDto[];
}