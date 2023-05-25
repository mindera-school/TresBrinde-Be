import { ApiProperty } from "@nestjs/swagger";
import {
  ArrayNotEmpty,
  IsArray,
  IsOptional,
  MaxLength,
  MinLength,
} from "class-validator";

export class SendBudgetDto {
  @IsArray()
  @ArrayNotEmpty()
  @ApiProperty({ type: [Number] })
  budgets: number[];
  @ApiProperty({ type: String })
  toEmail: String;
  @ApiProperty({ type: String })
  name: String;
  @ApiProperty({ type: String })
  address: String;
  @MinLength(8)
  @MaxLength(8)
  @ApiProperty({ type: String })
  zipCode: String;
  @MaxLength(200)
  @IsOptional()
  @ApiProperty({ type: String })
  message: String;
}
