import {CreatePriceQuantityDto} from "../dto/priceQuantity/create-priceQuantity.dto";
import {PriceQuantityEntity} from "../entities/priceQuantity.entity";
import {Builder} from "ts-generic-builder";
import {PriceQuantityDetailsDto} from "../dto/priceQuantity/priceQuantity-details.dto";
import {ProductEntity} from "../entities/product.entity";


export class PriceQuantityConverter {
    static fromCreatePriceQuantityToPriceQuantityEntity(
        createPriceQuantityDto: CreatePriceQuantityDto,
        productEntity: ProductEntity
    ): PriceQuantityEntity {
        return new Builder(PriceQuantityEntity)
            .with({
                id: null,
                product: productEntity,
                quantity: createPriceQuantityDto.quantity,
                unitPrice: createPriceQuantityDto.unitPrice
            })
            .build()
    }

    static fromPriceQuantityEntityToPriceQuantityDetailsDto(
        priceQuantityEntity: PriceQuantityEntity
    ): PriceQuantityDetailsDto {
        return new Builder(PriceQuantityDetailsDto)
            .with({
                id: priceQuantityEntity.id,
                quantity: priceQuantityEntity.quantity,
                unitPrice: priceQuantityEntity.unitPrice
            })
            .build()

    }
}