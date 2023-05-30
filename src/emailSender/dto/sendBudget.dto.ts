import { ApiProperty } from "@nestjs/swagger";
import {
  ArrayNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";
import { Budget } from "./budget.dto";

export class SendBudgetDto {
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @ApiProperty({
    type: [Budget],
  })
  budgets: Budget[];

  @ApiProperty({ type: String, example: "example@example.com" })
  toEmail: String;

  @ApiProperty({ type: String, example: "John Doe" })
  name: String;

  @ApiProperty({ type: String, example: "123 Street" })
  address: String;

  @MinLength(8)
  @MaxLength(8)
  @ApiProperty({ type: String, example: "12345678" })
  zipCode: String;

  @MaxLength(200)
  @IsOptional()
  @ApiProperty({
    type: String,
    example: "Additional message",
    required: false,
  })
  message: String;
}
