import { IsEmail, IsEmpty, IsNotEmpty, MaxLength } from "class-validator";
import { INVALID_FIELD_EXCEPTION } from "../../constants";
import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "../userRole.enum";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: "example@example.com", description: "Email example" })
  @MaxLength(120, { message: INVALID_FIELD_EXCEPTION("Email") })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: "example", description: "Password example" })
  password: string;

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

  @IsEmpty()
  role: UserRole;

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
