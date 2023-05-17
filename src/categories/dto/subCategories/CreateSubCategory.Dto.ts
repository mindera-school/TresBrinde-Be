import { IsNotEmpty, IsString, Matches, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { INVALIDFIELDEXCEPTION } from "../../../constants";

export class CreateSubCategoryDto {
  @IsNotEmpty()
  @ApiProperty({ example: "example", description: "name example" })
  @MaxLength(60, { message: INVALIDFIELDEXCEPTION("name") })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 1, description: "MainCategory id example" })
  mainCategory: number;
}
