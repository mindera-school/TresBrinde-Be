import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { PRODUCT_ALREADY_EXISTS_EXCEPTION } from "src/constants";

export class ProductAlreadyExistDto {
  @ApiProperty({ example: HttpStatus.CONFLICT })
  code: number;

  @ApiProperty({ example: PRODUCT_ALREADY_EXISTS_EXCEPTION })
  error: string;
}
