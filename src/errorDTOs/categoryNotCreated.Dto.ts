import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { CATEGORY_NOT_CREATED_EXCEPTION } from "src/constants";

export class CategoryNotCreatedDto {
  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  code: number;

  @ApiProperty({ example: CATEGORY_NOT_CREATED_EXCEPTION })
  error: string;
}
