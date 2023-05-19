import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { SUBCATEGORY_NOT_CREATED_EXCEPTION } from "src/constants";

export class SubcategoryNotCreatedDto {
  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  code: number;

  @ApiProperty({ example: SUBCATEGORY_NOT_CREATED_EXCEPTION })
  error: string;
}
