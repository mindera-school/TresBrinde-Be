import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { SUBCATEGORY_NOT_FOUND_EXCEPTION } from "src/constants";

export class SubcategoryNotFoundDto {
  @ApiProperty({ example: HttpStatus.NOT_FOUND })
  code: number;

  @ApiProperty({ example: SUBCATEGORY_NOT_FOUND_EXCEPTION })
  error: string;
}
