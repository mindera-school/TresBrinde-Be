import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { USER_NOT_AUTORIZED } from "src/constants";

export class UserNotAutorizedDto {
  @ApiProperty({ example: HttpStatus.UNAUTHORIZED })
  code: number;

  @ApiProperty({ example: USER_NOT_AUTORIZED })
  error: string;
}
