import { IsNotEmpty, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { INVALID_FIELD_EXCEPTION } from "../../../constants";
import { CreatePriceQuantityDto } from "../priceQuantity/create-priceQuantity.dto";
import { CreateProductPropertiesDto } from "../productProperties/create-productProperties.dto";

export class UpdateProductDto {
  @IsNotEmpty()
  @ApiProperty({ example: "12345D", description: "Reference example" })
  @MaxLength(10, { message: INVALID_FIELD_EXCEPTION("Reference") })
  reference: string;

  @IsNotEmpty()
  @ApiProperty({ example: "12345", description: "Catalog reference example" })
  @MaxLength(10, { message: INVALID_FIELD_EXCEPTION("Catelog reference") })
  catalogReference: string;

  @ApiProperty({ example: "Gaming chair", description: "Product name example" })
  @MaxLength(40, { message: INVALID_FIELD_EXCEPTION("Product name reference") })
  productName: string;

  @MaxLength(600, { message: INVALID_FIELD_EXCEPTION("Description") })
  @ApiProperty({
    example: "Razer Gaming Chair Big Size with extra PC support",
    description: "Description example",
  })
  description: string;

  @MaxLength(400, { message: INVALID_FIELD_EXCEPTION("Keywords") })
  @ApiProperty({
    example: "videogames gaming pc chair comfort",
    description: "Keywords example",
  })
  keywords: string;

  @MaxLength(40, { message: INVALID_FIELD_EXCEPTION("Brand") })
  @ApiProperty({ example: "Microsoft", description: "Brand example" })
  brand: string;

  @ApiProperty({ example: 22, description: "Price example" })
  price: number;

  @MaxLength(60, { message: INVALID_FIELD_EXCEPTION("material") })
  @ApiProperty({ example: "plastic and fabric" })
  material: string;

  @ApiProperty({ example: 50, description: "minimum quantity example" })
  minimumQuantity: number;

  @ApiProperty({ example: "[1,2]", description: "Sub category example" })
  subCategories: number[];

  @ApiProperty({
    example: [
      { reference: null, quantity: 50, unitPrice: 5 },
      { reference: null, quantity: 100, unitPrice: 3.9 },
    ],
    description: "unitPrice per quantity",
    isArray: true,
    type: () => [CreatePriceQuantityDto],
  })
  priceQuantities: CreatePriceQuantityDto[];

  @ApiProperty({
    example: [
      { property: "diameter", value: "N/S" },
      { property: "color", value: "Yellow" },
      { property: "color", value: "Purple" },
      { property: "length", value: "45" },
      { property: "height", value: "20" },
      { property: "width", value: "10" },
      { property: "size", value: "N/S" },
      { property: "size", value: "N/S" },
    ],
    description: "product properties",
    isArray: true,
    type: () => [CreateProductPropertiesDto],
  })
  productProperties: CreateProductPropertiesDto[];
}
