import { IsEmail, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { INVALID_FIELD_EXCEPTION } from "../../../constants";
import { CreateProductBudgetDto } from "../budgetProduct/createProductBudget.dto";

export class UpdateBudgetDto {
  @IsEmail()
  @ApiProperty({ example: "example@example.com", description: "Email example" })
  @MaxLength(120, { message: INVALID_FIELD_EXCEPTION("Email") })
  email: string;

  @MaxLength(9, { message: INVALID_FIELD_EXCEPTION("NIF") })
  @ApiProperty({
    example: "123456789",
    description: "Nif example",
    required: false,
  })
  NIF: string;

  @MaxLength(60, { message: INVALID_FIELD_EXCEPTION("Name") })
  @ApiProperty({ example: "Joe Fagundes", description: "Name example" })
  name: string;

  @MaxLength(100, { message: INVALID_FIELD_EXCEPTION("Company name") })
  @ApiProperty({
    example: "Example, Lda",
    description: "Company name example",
    required: false,
  })
  company_name: string;

  @ApiProperty({ example: "Portugal", description: "Country example" })
  country: string;

  @ApiProperty({ example: "1234567", description: "Postal Code example" })
  postal_code: string;

  @ApiProperty({ example: "Aveiro", description: "City example" })
  city: string;

  @ApiProperty({
    example: "Rua das bananas Nº7 ",
    description: "Address example",
  })
  address: string;

  @ApiProperty({ example: "912345678", description: "Contact exaple" })
  contact: string;

  @ApiProperty({ example: 1200.3, description: "expectedPrice" })
  expectedPrice: number;

  @ApiProperty({
    example: "I want the logo in full color on the top right of my chair",
  })
  description?: string;

  @ApiProperty({
    example: [{ productId: 1, quantity: 100 }],
    description: "products example",
  })
  productsQuantity: CreateProductBudgetDto[];
}
