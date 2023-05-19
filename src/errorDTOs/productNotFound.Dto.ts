import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { PRODUCT_NOT_FOUND_EXCEPTION } from "src/constants";

export class ProductNotFoundDto {
  @ApiProperty({ example: HttpStatus.NOT_FOUND })
  code: number;

  @ApiProperty({ example: PRODUCT_NOT_FOUND_EXCEPTION })
  error: string;
}
