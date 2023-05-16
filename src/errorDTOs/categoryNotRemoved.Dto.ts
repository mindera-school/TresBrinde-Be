import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { CATEGORY_NOT_REMOVED_EXCEPTION } from "src/constants";

export class CategoryNotRemovedDto {
  @ApiProperty({ example: HttpStatus.NOT_MODIFIED })
  code: number;

  @ApiProperty({ example: CATEGORY_NOT_REMOVED_EXCEPTION })
  error: string;
}
