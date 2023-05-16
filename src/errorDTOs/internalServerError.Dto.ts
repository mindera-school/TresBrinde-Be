import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { OPERATION_FAILED } from "src/constants";

export class InternalServerErrorDto {
  @ApiProperty({ example: HttpStatus.INTERNAL_SERVER_ERROR })
  status: number;

  @ApiProperty({ example: OPERATION_FAILED })
  message: string;
}
