import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {PropertyEntity} from "../entities/property.entity";
import {CreateProductPropertiesDto} from "../dto/productProperties/create-productProperties.dto";
import {ProductEntity} from "../entities/product.entity";
import {ProductPropertyEntity} from "../entities/productProperty.entity";
import {ProductPropertyConverter} from "../converters/productProperty.converter";
import {DATABASECONNECTIONEXCEPTION, PROPERTYNOTFOUNDEXCEPTION} from "../../constants";
import {PropertyService} from "./property.service";
import {QueryRunner} from "typeorm";
import {PropertyConverter} from "../converters/property.converter";
import {ProductPropertyRepository} from "../repositories/productProperties.repository";
import {ProductPropertyDetailsDto} from "../dto/productProperties/productProperty-details.dto";

@Injectable()
export class ProductPropertyService {
    constructor(
        private productPropertyRepository: ProductPropertyRepository,
        private propertyService: PropertyService,
    ) {
    }

    async createProductProperties(
        createProductProperties: CreateProductPropertiesDto[],
        productEntity: ProductEntity,
        queryRunner: QueryRunner
    ): Promise<ProductPropertyEntity[]> {
        const productPropertiesEntities: ProductPropertyEntity[] = []
        let propertyEntityList: PropertyEntity[] = [];

        try {
            const uniqueProperties = this.getUniqueProperties(createProductProperties)

            for (const property of uniqueProperties) {
                let propertyEntity = await this.propertyService.findByName(property.property)
                propertyEntityList.push(
                    propertyEntity ?
                        propertyEntity :
                        PropertyConverter.fromPropertyDetailsDtoToPropertyEntity(await this.propertyService.createProperty(property.property, queryRunner)))
            }

            for (const createProductProperty of createProductProperties) {
                let propertyEntity: PropertyEntity = propertyEntityList.find(
                    (propertyEntity) => propertyEntity.name === createProductProperty.property.toLowerCase())

                productPropertiesEntities.push(
                    await queryRunner.manager.save(
                        ProductPropertyConverter.fromCreateProductPropertyDtoToProductPropertyEntity(createProductProperty, propertyEntity, productEntity)
                    )
                )
            }
        } catch (e) {
            await queryRunner.rollbackTransaction();
            throw new HttpException(DATABASECONNECTIONEXCEPTION, HttpStatus.BAD_REQUEST)
        }


        return productPropertiesEntities;
    }

    async getProductPropertyById(id: number): Promise<ProductPropertyDetailsDto> {
        return ProductPropertyConverter.fromProductPropertyEntityToProductPropertyDetailsDto(
            await this.productPropertyRepository.findOne({
                relations: ["property"],
                where: {id: id}
            })
        )
    }

    async getAllProductPropertiesByProductId(id: number): Promise<ProductPropertyEntity[]> {
        const productPropertyEntityList: ProductPropertyEntity[] = []
        for (const productProperty of await this.productPropertyRepository.find({
            relations: ["property"],
            where: {product: id}
        })) {
            productPropertyEntityList.push(productProperty)
        }
        return productPropertyEntityList;
    }


    async updateProductProperties(
        newProductProperties: CreateProductPropertiesDto[],
        queryRunner: QueryRunner,
        productEntity: ProductEntity,
    ) {
        const toDeleteProductProperties: ProductPropertyEntity[] =
            this.getToDeleteProductProperties(productEntity.productProperties, newProductProperties);
        const toCreateProductProperties: CreateProductPropertiesDto[] =
            this.getToInsertProductProperties(productEntity.productProperties, newProductProperties)

        for (const toDeleteProductProperty of toDeleteProductProperties) {
            try {
                await queryRunner.manager.delete(ProductPropertyEntity, toDeleteProductProperty)
            } catch (e) {
                await queryRunner.rollbackTransaction();
                throw new HttpException(DATABASECONNECTIONEXCEPTION, HttpStatus.BAD_REQUEST)
            }
        }


        for (const toCreateProductProperty of toCreateProductProperties) {
            let propertyEntity: PropertyEntity = PropertyConverter.fromPropertyDetailsDtoToPropertyEntity(
                await this.propertyService.findByName(toCreateProductProperty.property)
            )

            if (!propertyEntity) {
                propertyEntity = PropertyConverter.fromPropertyDetailsDtoToPropertyEntity(
                    await this.propertyService.createProperty(toCreateProductProperty.property, queryRunner)
                )
            }
            try {
                await queryRunner.manager.save(
                    ProductPropertyConverter.fromCreateProductPropertyDtoToProductPropertyEntity(
                        toCreateProductProperty, propertyEntity, productEntity
                    )
                )
            } catch (e) {
                await queryRunner.rollbackTransaction();
                throw new HttpException(DATABASECONNECTIONEXCEPTION, HttpStatus.BAD_REQUEST)
            }
        }
    }

    private getUniqueProperties(createProductProperties: CreateProductPropertiesDto[]) {
        return createProductProperties.filter(
            (cPPDto, i) =>
                createProductProperties.findIndex((s) => cPPDto.property === s.property) === i
        )
    }

    private getToDeleteProductProperties(
        oldProductProperties: ProductPropertyEntity[],
        newProductProperties: CreateProductPropertiesDto[]
    ): ProductPropertyEntity[] {
        const toDeleteProductProperties: ProductPropertyEntity[] = [];

        for (const oldProductProperty of oldProductProperties) {
            let toDelete = true;
            for (const newProductProperty of newProductProperties) {
                if (
                    oldProductProperty.property.name.toLowerCase() === newProductProperty.property.toLowerCase()
                    &&
                    oldProductProperty.value.toLowerCase() === newProductProperty.value.toLowerCase()
                ) {
                    toDelete = false;
                }
            }
            if (toDelete) {
                toDeleteProductProperties.push(oldProductProperty)
            }
        }

        return toDeleteProductProperties;
    }

    private getToInsertProductProperties(
        oldProductProperties: ProductPropertyEntity[],
        newProductProperties: CreateProductPropertiesDto[]
    ): CreateProductPropertiesDto[] {
        const toInsertProductProperties: CreateProductPropertiesDto[] = [];

        for (const newProductProperty of newProductProperties) {
            let toInsert = true;
            for (const oldProductProperty of oldProductProperties) {
                if (
                    oldProductProperty.property.name.toLowerCase() === newProductProperty.property.toLowerCase()
                    &&
                    oldProductProperty.value.toLowerCase() === newProductProperty.value.toLowerCase()
                ) {
                    toInsert = false;
                }

            }

            const contains = toInsertProductProperties.some((elem) => {
                return JSON.stringify(newProductProperty) === JSON.stringify(elem)
            })

            if (contains) toInsert = false

            if (toInsert) {
                toInsertProductProperties.push(newProductProperty)
            }

        }
        return toInsertProductProperties;
    }

    async deleteByProductId(id: number, queryRunner: QueryRunner) {
        await queryRunner.manager.delete(ProductPropertyEntity, {product: id})
    }

    async addImageToProperty(propertyId: number, file: Express.Multer.File) {
        const productPropertyEntity: ProductPropertyEntity = await this.productPropertyRepository.findOne(propertyId)

        if (!productPropertyEntity) {
            throw new HttpException(PROPERTYNOTFOUNDEXCEPTION, HttpStatus.NOT_FOUND)
        }

        if (productPropertyEntity.image) {
            try {
                const fs = require('fs')
                fs.unlinkSync(productPropertyEntity.image)
            } catch (e) {
                throw new HttpException("File was not found", HttpStatus.NOT_FOUND)
            }
        }

        productPropertyEntity.image = file.path

        await this.productPropertyRepository.save(productPropertyEntity)
    }

    async createBulkProductProperties(productProperties: CreateProductPropertiesDto[], productEntity: ProductEntity, queryRunner: QueryRunner) {
        const productPropertiesEntities: ProductPropertyEntity[] = []
        let propertyEntityList: PropertyEntity[] = [];

        try {
            const uniqueProperties = this.getUniqueProperties(productProperties)

            for (const property of uniqueProperties) {
                let propertyEntity = await this.propertyService.findByName(property.property)
                propertyEntityList.push(
                    propertyEntity ?
                        propertyEntity :
                        PropertyConverter.fromPropertyDetailsDtoToPropertyEntity(
                            await this.propertyService.createProperty(property.property, queryRunner)
                        )
                )
            }

            for (const createProductProperty of productProperties) {
                let propertyEntity: PropertyEntity = propertyEntityList.find(
                    (propertyEntity) => propertyEntity.name === createProductProperty.property.toLowerCase())

                await queryRunner.manager.save(
                    ProductPropertyConverter.fromCreateProductPropertyDtoToProductPropertyEntity(createProductProperty, propertyEntity, productEntity)
                )

            }
        } catch (e) {
            return null;
        }

        return productPropertiesEntities;
    }
}