import { IsNotEmpty, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { INVALID_FIELD_EXCEPTION } from "../../../constants";

export class CreateCategoryDto {
  @IsNotEmpty()
  @MaxLength(60, { message: INVALID_FIELD_EXCEPTION("name") })
  @ApiProperty({
    example: "example",
    description: "Category Name",
    maxLength: 60,
  })
  name: string;

  @IsNotEmpty()
  @MaxLength(600, { message: INVALID_FIELD_EXCEPTION("description") })
  @ApiProperty({
    example: "example",
    description: "Category Description",
    maxLength: 600,
  })
  description: string;
}
