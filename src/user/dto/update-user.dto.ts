import { IsEmail, IsEmpty, IsNotEmpty, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { INVALID_FIELD_EXCEPTION } from "../../constants";
import { UserRole } from "../userRole.enum";

export class UpdateUserDto {
  @MaxLength(9, { message: INVALID_FIELD_EXCEPTION("NIF") })
  @ApiProperty({
    example: "123456789",
    description: "Nif example",
    required: false,
  })
  NIF: string;

  @MaxLength(100, { message: INVALID_FIELD_EXCEPTION("Company name") })
  @ApiProperty({
    example: "Example, Lda",
    description: "Company name example",
    required: false,
  })
  company_name: string;

  @IsNotEmpty()
  @MaxLength(60, { message: INVALID_FIELD_EXCEPTION("Name") })
  @ApiProperty({ example: "Joe Fagundes", description: "Name example" })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: "Portugal", description: "Country example" })
  country: string;

  @IsNotEmpty()
  @ApiProperty({ example: "1234567", description: "Postal Code example" })
  postal_code: string;

  @IsNotEmpty()
  @ApiProperty({ example: "Aveiro", description: "City example" })
  city: string;

  @IsNotEmpty()
  @ApiProperty({
    example: "Rua das bananas Nº7 ",
    description: "Address example",
  })
  address: string;

  @IsNotEmpty()
  @ApiProperty({ example: "912345678", description: "Contact exaple" })
  contact: string;
}
