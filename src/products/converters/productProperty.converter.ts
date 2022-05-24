import {CreateProductPropertiesDto} from "../dto/productProperties/create-productProperties.dto";
import {ProductPropertyEntity} from "../entities/productProperty.entity";
import {Builder} from "ts-generic-builder";
import {ProductEntity} from "../entities/product.entity";
import {ProductPropertyDetailsDto} from "../dto/productProperties/productProperty-details.dto";
import {PropertyEntity} from "../entities/property.entity";

export class ProductPropertyConverter {
    static fromCreateProductPropertyDtoToProductPropertyEntity(createProductProperty: CreateProductPropertiesDto, propertyEntity: PropertyEntity, productEntity: ProductEntity): ProductPropertyEntity {
        return new Builder(ProductPropertyEntity)
            .with({
                id: null,
                property: propertyEntity,
                product: productEntity,
                value: createProductProperty.value,
            })
            .build()
    }

    static fromProductPropertyEntityToProductPropertyDetailsDto(productPropertyEntity: ProductPropertyEntity): ProductPropertyDetailsDto {
        return new Builder(ProductPropertyDetailsDto)
            .with({
                id: productPropertyEntity.id,
                name: productPropertyEntity.property.name,
                value: productPropertyEntity.value,
                image: productPropertyEntity.image
            })
            .build()
    }
}
