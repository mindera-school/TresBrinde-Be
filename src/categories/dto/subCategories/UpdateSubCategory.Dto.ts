import { IsNotEmpty, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { INVALIDFIELDEXCEPTION } from "../../../constants";

export class UpdateSubCategoryDto {
  @IsNotEmpty()
  @ApiProperty({ example: "example", description: "name example" })
  @MaxLength(60, { message: INVALIDFIELDEXCEPTION("name") })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 1, description: "main category id example" })
  mainCategory: number;
}
