import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { ONLY_IMAGE_ALLOWED_EXCEPTION } from "src/constants";

export class OnlyImagesAllowedDto {
  @ApiProperty({ example: HttpStatus.CONFLICT })
  status: number;

  @ApiProperty({ example: ONLY_IMAGE_ALLOWED_EXCEPTION })
  message: string;
}
