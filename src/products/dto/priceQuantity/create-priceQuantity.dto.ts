import {ApiProperty} from "@nestjs/swagger";

export class CreatePriceQuantityDto {
    @ApiProperty({example: "100", description: "Quantity example",})
    quantity: number;
    @ApiProperty({example: "5.00", description: "unitPrice example",})
    unitPrice: number;
}