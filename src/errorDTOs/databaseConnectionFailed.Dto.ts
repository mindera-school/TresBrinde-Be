import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { DATABASE_CONNECTION_EXCEPTION } from "src/constants";

export class DatabaseConnectionFailedDto {
  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  code: number;

  @ApiProperty({ example: DATABASE_CONNECTION_EXCEPTION })
  error: string;
}
