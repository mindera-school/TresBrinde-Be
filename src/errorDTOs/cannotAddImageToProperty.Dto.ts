import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { CANNOT_ADD_IMAGE_TO_PROPERTY_EXCEPTION } from "src/constants";

export class CannotAddImageToPropertyDto {
  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  code: number;

  @ApiProperty({ example: CANNOT_ADD_IMAGE_TO_PROPERTY_EXCEPTION })
  error: string;
}
