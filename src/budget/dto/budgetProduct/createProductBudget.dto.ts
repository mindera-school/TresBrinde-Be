import {ApiProperty} from "@nestjs/swagger";

export class CreateProductBudgetDto {
    @ApiProperty({example: 1, description: "productId"})
    productId: number;

    @ApiProperty({example: 100, description: "quantity"})
    quantity: number;

}