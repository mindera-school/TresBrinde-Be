import { ApiProperty } from "@nestjs/swagger";

export class AddWebImageToProductDto {
  @ApiProperty({ type: "string" })
  photo_url: string;

  @ApiProperty({ type: "boolean" })
  isMainImage: boolean;

  @ApiProperty({ type: "number" })
  productId: number;

  @ApiProperty({ type: "number", required: false })
  propertyId?: number;
}
