import { ApiProperty } from "@nestjs/swagger";
import { SubCategoryDetailsDto } from "../../../categories/dto/subCategories/SubCategoryDetails.Dto";
import { PriceQuantityDetailsDto } from "../priceQuantity/priceQuantity-details.dto";
import { ProductPropertyDetailsDto } from "../productProperties/productProperty-details.dto";
import { TableImagesDetailsDto } from "../tableImages/tableImage-details.dto";

export class ProductDetailsDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  reference: string;

  @ApiProperty()
  catalogReference: string;

  @ApiProperty()
  productName: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  keywords: string;

  @ApiProperty()
  mainImage: string;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  material: string;

  @ApiProperty()
  minimumQuantity: number;

  @ApiProperty({ type: () => [SubCategoryDetailsDto] })
  subCategories: SubCategoryDetailsDto[];

  @ApiProperty({ type: () => [PriceQuantityDetailsDto] })
  priceQuantity: PriceQuantityDetailsDto[];

  @ApiProperty({ type: () => [ProductPropertyDetailsDto] })
  productProperty: ProductPropertyDetailsDto[];

  @ApiProperty({ type: () => [TableImagesDetailsDto] })
  tableImage: TableImagesDetailsDto[];

  constructor(partial: Partial<ProductDetailsDto>) {
    Object.assign(this, partial);
  }
}