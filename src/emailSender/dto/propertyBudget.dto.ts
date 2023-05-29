import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class Property {
  @IsString()
  @ApiProperty({ type: String, example: "color" })
  propertyName: string;

  @IsString()
  @ApiProperty({ type: String, example: "red" })
  propertyValue: string;
}
