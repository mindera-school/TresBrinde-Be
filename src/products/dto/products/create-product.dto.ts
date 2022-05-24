import {IsNotEmpty, MaxLength} from "class-validator";
import {INVALIDFIELDEXCEPTION} from "../../../constants";
import {ApiProperty} from "@nestjs/swagger";
import {CreatePriceQuantityDto} from "../priceQuantity/create-priceQuantity.dto";
import {CreateProductPropertiesDto} from "../productProperties/create-productProperties.dto";

export class CreateProductDto {

    @IsNotEmpty()
    @ApiProperty({example: "TB_12345D", description: "Reference example"})
    @MaxLength(10, {message: INVALIDFIELDEXCEPTION("Reference")})
    reference: string;

    @IsNotEmpty()
    @ApiProperty({example: "12345", description: "Catalog reference example"})
    @MaxLength(10, {message: INVALIDFIELDEXCEPTION("Catelog reference")})
    catalogReference: string;

    @ApiProperty({example: "Gaming chair", description: "Product name example"})
    @MaxLength(40, {message: INVALIDFIELDEXCEPTION("Product name reference")})
    productName: string;

    @MaxLength(600, {message: INVALIDFIELDEXCEPTION("Description")})
    @ApiProperty({example: "Razer Gaming Chair Big Size with extra PC support", description: "Description example"})
    description: string;

    @MaxLength(400, {message: INVALIDFIELDEXCEPTION("Keywords")})
    @ApiProperty({example: "videogames gaming pc chair comfort", description: "Keywords example"})
    keywords: string;

    @MaxLength(40, {message: INVALIDFIELDEXCEPTION("Brand")})
    @ApiProperty({example: "Microsoft", description: "Brand example"})
    brand: string;

    @MaxLength(60, {message: INVALIDFIELDEXCEPTION("material")})
    @ApiProperty({example: "plastic and fabric"})
    material: string;

    @ApiProperty({example: 10.00, description: "Price example"})
    price: number;

    @ApiProperty({example: 50, description: "minimum quantity example"})
    minimumQuantity: number;

    @ApiProperty({example: "[1,2]", description: "Sub category example"})
    subCategories: number[];

    @ApiProperty({
        example: [{quantity: 100, unitPrice: 5}, {quantity: 200, unitPrice: 3.90}],
        description: "unitPrice per quantity",
        isArray: true,
        type: () => [CreatePriceQuantityDto]
    })
    priceQuantities: CreatePriceQuantityDto[];

    @ApiProperty({
        example: [
            {property: "diameter", value: "7.2"},
            {property: "color", value: "Blue"},
            {property: "color", value: "red"},
            {property: "length", value: "35"},
            {property: "height", value: "32"},
            {property: "width", value: "12"},
            {property: "size", value: "S"},
            {property: "size", value: "M"},
        ],
        description: "product properties",
        isArray: true,
        type: () => [CreateProductPropertiesDto]
    })
    productProperties: CreateProductPropertiesDto[];
}
