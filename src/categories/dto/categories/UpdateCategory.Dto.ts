import { IsNotEmpty, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { INVALID_FIELD_EXCEPTION } from "../../../constants";

export class UpdateCategoryDto {
  @IsNotEmpty()
  @ApiProperty({
    example: "example",
    description: "Category Name",
    maxLength: 60,
  })
  @MaxLength(60, { message: INVALID_FIELD_EXCEPTION("name") })
  name: string;

  @ApiProperty({
    example: "example",
    description: "Category Description",
    maxLength: 200,
    required: false,
  })
  @MaxLength(200, { message: INVALID_FIELD_EXCEPTION("description") })
  description?: string;
}
