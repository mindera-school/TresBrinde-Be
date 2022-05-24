import {ApiProperty} from "@nestjs/swagger";

export class CreateProductPropertiesDto {
    @ApiProperty({example: "color", description: "Properties"})
    property: string;

    @ApiProperty({example: ["blue", "30", "30"], description: "Value of the property"})
    value: string;
}
