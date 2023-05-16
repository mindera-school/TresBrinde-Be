import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { CATEGORY_ALREADY_EXISTS_EXCEPTION } from "src/constants";

export class CategoryAlreadyExistDto {
  @ApiProperty({ example: HttpStatus.CONFLICT })
  code: number;

  @ApiProperty({ example: CATEGORY_ALREADY_EXISTS_EXCEPTION })
  error: string;
}
