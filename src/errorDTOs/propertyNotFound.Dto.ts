import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { PROPERTY_NOT_FOUND_EXCEPTION } from "src/constants";

export class PropertyNotFoundDto {
  @ApiProperty({ example: HttpStatus.NOT_FOUND })
  code: number;

  @ApiProperty({ example: PROPERTY_NOT_FOUND_EXCEPTION })
  error: string;
}
