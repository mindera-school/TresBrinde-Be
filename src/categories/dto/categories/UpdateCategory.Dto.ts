import {IsNotEmpty, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {INVALIDFIELDEXCEPTION} from "../../../constants";

export class UpdateCategoryDto {
    @IsNotEmpty()
    @ApiProperty({example: "example", description: "name example"})
    @MaxLength(60, {message: INVALIDFIELDEXCEPTION("name")})
    name: string;

}
