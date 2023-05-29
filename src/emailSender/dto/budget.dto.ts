import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { Property } from "./propertyBudget.dto";

export class Budget {
  @IsNumber()
  @ApiProperty({ type: Number })
  productId: number;

  @IsNumber()
  @ApiProperty({ type: Number })
  quantity: number;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @ApiProperty({ type: [Property] })
  properties: Property[];
}
