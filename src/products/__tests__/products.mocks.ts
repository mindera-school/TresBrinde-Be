import {ProductDetailsDto} from "../dto/products/product-details.dto";
import {HttpException, HttpStatus} from "@nestjs/common";


export module productMocks {
    /*    export function getMockedProductDetailsDto(): ProductDetailsDto {
            let detailsProductDto: ProductDetailsDto = new Builder(ProductDetailsDto)
                .with({id: 57})
                .with({reference: "headphones"})
                .with({catalogReference: "sound products"})
                .with({productName: "Sony Rockstar"})
                .with({description: "Average size heaphones with soft texture"})
                .with({keywords: "Sony phones audio sound music"})
                .with({size: "average"})
                .with({color: "blue"})
                .with({mainImage: "jdghfdghfdjhgdkhdfgdhfgjdhgjghjnk",})
                .with({brand: "Sony"})
                .with({price: 1})
                .with({subCategory: null})
                .build();
            return detailsProductDto;
        }*/

    export function getMockedUpdatedProductDetailsDto(productDto: ProductDetailsDto): ProductDetailsDto {
        let detailsProductDto: ProductDetailsDto = productDto;
        return detailsProductDto;
    }

    // export function getMockedProductDetailsDtoList(): DetailsProductDto[] {
    //     return [getMockedProductDetailsDto()]
    // }

    export function getMockedProductDetailsDtoUpdate(detailsProductDto: ProductDetailsDto): ProductDetailsDto {
        return getMockedUpdatedProductDetailsDto(detailsProductDto);
    }

    export const getHttpException = () => new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
}