import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class Property {
  @IsString()
  @ApiProperty({ type: String })
  propertyName: string;

  @IsString()
  @ApiProperty({ type: String })
  propertyValue: string;
}
