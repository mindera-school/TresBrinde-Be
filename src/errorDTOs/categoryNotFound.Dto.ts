import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { CATEGORY_NOT_FOUND_EXCEPTION } from "src/constants";

export class CategoryNotFoundDto {
  @ApiProperty({ example: HttpStatus.NOT_FOUND })
  code: number;

  @ApiProperty({ example: CATEGORY_NOT_FOUND_EXCEPTION })
  error: string;
}
