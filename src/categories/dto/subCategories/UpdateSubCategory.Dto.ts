import { IsNotEmpty, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { INVALID_FIELD_EXCEPTION } from "../../../constants";

export class UpdateSubCategoryDto {
  @IsNotEmpty()
  @ApiProperty({ example: "example", description: "name example" })
  @MaxLength(60, { message: INVALID_FIELD_EXCEPTION("name") })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 1, description: "main category id example" })
  mainCategory: number;
}
