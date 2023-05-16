import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { SUBCATEGORY_ALREADY_EXISTS_EXCEPTION } from "src/constants";

export class SubcategoryAlreadyExistDto {
  @ApiProperty({ example: HttpStatus.CONFLICT })
  code: number;

  @ApiProperty({ example: SUBCATEGORY_ALREADY_EXISTS_EXCEPTION })
  error: string;
}
