import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { PRICE_QUANTITY_NOT_CREATED_EXCEPTION } from "src/constants";

export class PriceQuantityNotCreatedDto {
  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  code: number;

  @ApiProperty({ example: PRICE_QUANTITY_NOT_CREATED_EXCEPTION })
  error: string;
}
