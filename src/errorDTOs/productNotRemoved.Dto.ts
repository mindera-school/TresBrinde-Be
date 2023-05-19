import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { PRODUCT_NOT_REMOVED_EXCEPTION } from "src/constants";

export class ProductNotRemovedDto {
  @ApiProperty({ example: HttpStatus.NOT_MODIFIED })
  code: number;

  @ApiProperty({ example: PRODUCT_NOT_REMOVED_EXCEPTION })
  error: string;
}
