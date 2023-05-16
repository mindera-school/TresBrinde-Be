import { IsNotEmpty, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { INVALIDFIELDEXCEPTION } from "../../../constants";

export class CreateCategoryDto {
  @IsNotEmpty()
  @MaxLength(60, { message: INVALIDFIELDEXCEPTION("name") })
  @ApiProperty({
    example: "example",
    description: "Category Name",
    maxLength: 60,
  })
  name: string;

  @IsNotEmpty()
  @MaxLength(200, { message: INVALIDFIELDEXCEPTION("description") })
  @ApiProperty({
    example: "example",
    description: "Category Description",
    maxLength: 200,
  })
  description: string;
}
