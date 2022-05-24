import {ApiProperty} from "@nestjs/swagger";

export class SingleFileToProductDto {
    @ApiProperty({type: "string", format: "binary"})
    photo_url: string
    @ApiProperty({type: "boolean"})
    isMainImage: string
    @ApiProperty({type: "number"})
    productId: number
    @ApiProperty({type: "number", required: false})
    propertyId: number

}