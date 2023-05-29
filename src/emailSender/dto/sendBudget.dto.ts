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
  @ApiProperty({ type: [Budget] })
  budgets: Budget[];
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
  @ApiProperty({ type: String , required: false })
  message: String;
}
