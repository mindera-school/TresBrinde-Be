import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { PROPERTY_NOT_CREATED_EXCEPTION } from "src/constants";

export class PropertyNotCreatedDto {
  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  code: number;

  @ApiProperty({ example: PROPERTY_NOT_CREATED_EXCEPTION })
  error: string;
}
