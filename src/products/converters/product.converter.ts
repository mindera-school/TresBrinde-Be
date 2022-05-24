import {Builder} from "ts-generic-builder";
import {ProductDetailsDto} from "../dto/products/product-details.dto";
import {ProductEntity} from "../entities/product.entity";
import {CreateProductDto} from "../dto/products/create-product.dto";
import {SubCategoryEntity} from "../../categories/entities/subCategory.entity";
import {PriceQuantityDetailsDto} from "../dto/priceQuantity/priceQuantity-details.dto";
import {SubCategoryDetailsDto} from "../../categories/dto/subCategories/SubCategoryDetails.Dto";
import {ProductPropertyDetailsDto} from "../dto/productProperties/productProperty-details.dto";
import {UpdateProductDto} from "../dto/products/update-product.dto";
import {PriceQuantityEntity} from "../entities/priceQuantity.entity";
import {ProductPropertyEntity} from "../entities/productProperty.entity";
import {TableImagesDetailsDto} from "../dto/tableImages/tableImage-details.dto";
import {CreateBulkProductsDto} from "../dto/products/createBulkProducts.dto";

export class ProductConverter {
    static fromProductEntityToProductDetailsDto(
        productEntity: ProductEntity,
        subCategoryDetailsDtoList: SubCategoryDetailsDto[],
        priceQuantityDetailsDtoList: PriceQuantityDetailsDto[],
        productPropertyDetailsDtoList: ProductPropertyDetailsDto[],
        tableImageDetailsDtoList?: TableImagesDetailsDto[],
    ): ProductDetailsDto {
        return new Builder(ProductDetailsDto)
            .with({
                id: productEntity.id,
                reference: productEntity.reference,
                catalogReference: productEntity.catalogReference,
                productName: productEntity.productName,
                description: productEntity.description,
                keywords: productEntity.keywords,
                mainImage: productEntity.mainImage,
                brand: productEntity.brand,
                price: productEntity.price,
                material: productEntity.material,
                minimumQuantity: productEntity.minimumQuantity,
                subCategories: subCategoryDetailsDtoList,
                priceQuantity: priceQuantityDetailsDtoList,
                productProperty: productPropertyDetailsDtoList,
                tableImage: tableImageDetailsDtoList,
            })
            .build();
    }

    static fromUpdateProductDtoToProductEntity(
        id: number,
        updateProductDto: UpdateProductDto,
        subCategories: SubCategoryEntity[]
    ) {
        return new Builder(ProductEntity)
            .with({
                id: id,
                mainImage: null,
                reference: updateProductDto.reference,
                catalogReference: updateProductDto.catalogReference,
                minimumQuantity: updateProductDto.minimumQuantity,
                productName: updateProductDto.productName,
                description: updateProductDto.description,
                keywords: updateProductDto.keywords,
                material: updateProductDto.material,
                brand: updateProductDto.brand,
                price: updateProductDto.price,
                subCategories: subCategories,
            })
            .build();
    }

    static fromProductCreateDtoToProductEntity(
        createProductDto: CreateProductDto,
        subCategories: SubCategoryEntity[],
    ): ProductEntity {
        return new Builder(ProductEntity)
            .with({
                id: null,
                mainImage: null,
                reference: createProductDto.reference,
                catalogReference: createProductDto.catalogReference,
                minimumQuantity: createProductDto.minimumQuantity,
                productName: createProductDto.productName,
                description: createProductDto.description,
                keywords: createProductDto.keywords,
                material: createProductDto.material,
                brand: createProductDto.brand,
                price: createProductDto.price,
                subCategories: subCategories,

            })
            .build();
    }

    static fromProductDetailsDtoToProductEntity(
        productDetailsDto: ProductDetailsDto,
        productPropertyEntityList?: ProductPropertyEntity[],
        priceQuantityEntityList?: PriceQuantityEntity[],
    ): ProductEntity {
        return new Builder(ProductEntity)
            .with({
                id: productDetailsDto.id,
                reference: productDetailsDto.reference,
                catalogReference: productDetailsDto.catalogReference,
                minimumQuantity: productDetailsDto.minimumQuantity,
                productName: productDetailsDto.productName,
                description: productDetailsDto.description,
                mainImage: productDetailsDto.mainImage,
                keywords: productDetailsDto.keywords,
                material: productDetailsDto.material,
                brand: productDetailsDto.brand,
                price: productDetailsDto.price,
                subCategories: productDetailsDto.subCategories,
                priceQuantities: priceQuantityEntityList,
                productProperties: productPropertyEntityList,
            })
            .build();
    }
    static fromCreateBulkProductsDtoToProductEntity(
        createBulkProductsDto: CreateBulkProductsDto,
        subCategories: SubCategoryEntity[],
    ): ProductEntity {
        return new Builder(ProductEntity)
            .with({
                id: null,
                mainImage: null,
                reference: createBulkProductsDto.reference,
                catalogReference: createBulkProductsDto.catalogReference,
                minimumQuantity: createBulkProductsDto.minimumQuantity,
                productName: createBulkProductsDto.productName,
                description: createBulkProductsDto.description,
                keywords: createBulkProductsDto.keywords,
                material: createBulkProductsDto.material,
                brand: createBulkProductsDto.brand,
                price: createBulkProductsDto.price,
                subCategories: subCategories,

            })
            .build();
    }
}
