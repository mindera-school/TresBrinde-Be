import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { FILE_NOT_REMOVED_EXCEPTION } from "src/constants";

export class FileNotRemovedDto {
  @ApiProperty({ example: HttpStatus.NOT_MODIFIED })
  code: number;

  @ApiProperty({ example: FILE_NOT_REMOVED_EXCEPTION })
  error: string;
}
