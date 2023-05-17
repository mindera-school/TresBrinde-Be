import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { SUBCATEGORY_NOT_REMOVED_EXCEPTION } from "src/constants";

export class SubcategoryNotRemovedDto {
  @ApiProperty({ example: HttpStatus.NOT_MODIFIED })
  code: number;

  @ApiProperty({ example: SUBCATEGORY_NOT_REMOVED_EXCEPTION })
  error: string;
}
