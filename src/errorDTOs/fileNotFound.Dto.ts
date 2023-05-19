import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { FILE_NOT_FOUND_EXCEPTION } from "src/constants";

export class FileNotFoundDto {
  @ApiProperty({ example: HttpStatus.NOT_FOUND })
  code: number;

  @ApiProperty({ example: FILE_NOT_FOUND_EXCEPTION })
  error: string;
}
