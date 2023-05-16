import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {PriceQuantityRepository} from "../repositories/priceQuantity.repository";
import {CreatePriceQuantityDto} from "../dto/priceQuantity/create-priceQuantity.dto";
import {PriceQuantityEntity} from "../entities/priceQuantity.entity";
import {ProductEntity} from "../entities/product.entity";
import {PriceQuantityConverter} from "../converters/priceQuantity.converter";
import { DATABASE_CONNECTION_EXCEPTION } from "../../constants";
import {QueryRunner} from "typeorm";

@Injectable()
export class PriceQuantityService {
    constructor(
        private priceQuantityRepository: PriceQuantityRepository,
    ) {
    }

    async createPriceQuantities(
        createPriceQuantityDtoList: CreatePriceQuantityDto[],
        productEntity: ProductEntity,
        queryRunner
    ): Promise<PriceQuantityEntity[]> {
        const priceQuantityEntities: PriceQuantityEntity[] = []
        try {
            for (const createPriceQuantityDto of createPriceQuantityDtoList) {
                priceQuantityEntities.push(
                    await queryRunner.manager.save(
                        PriceQuantityConverter.fromCreatePriceQuantityToPriceQuantityEntity(createPriceQuantityDto, productEntity)
                    )
                )
            }
        } catch (e) {
            await queryRunner.rollbackTransaction();
            throw new HttpException(
              DATABASE_CONNECTION_EXCEPTION,
              HttpStatus.BAD_REQUEST
            );
        }

        return priceQuantityEntities;
    }

    async getAllPriceQuantitiesByProductId(id: number): Promise<PriceQuantityEntity[]> {
        const priceQuantityEntities: PriceQuantityEntity[] = []

        for (const priceQuantityEntity of await this.priceQuantityRepository.find({where: {product: id}})) {
            priceQuantityEntities.push(priceQuantityEntity);
        }

        return priceQuantityEntities;
    }

    async updatePriceQuantity(
        newPriceQuantities: CreatePriceQuantityDto[],
        queryRunner,
        productEntity: ProductEntity
    ) {

        const toDeletePriceQuantities: PriceQuantityEntity[] =
            this.getToDeletePriceQuantities(productEntity.priceQuantities, newPriceQuantities);


        for (const toDeletePriceQuantity of toDeletePriceQuantities) {
            try {
                await queryRunner.manager.delete(PriceQuantityEntity, toDeletePriceQuantity)
            } catch (e) {
                await queryRunner.rollbackTransaction();
                throw new HttpException(
                  DATABASE_CONNECTION_EXCEPTION,
                  HttpStatus.BAD_REQUEST
                );
            }
        }

        for (const toCreatePriceQuantity of newPriceQuantities) {
            try {
                await queryRunner.manager.save(
                    PriceQuantityConverter.fromCreatePriceQuantityToPriceQuantityEntity(
                        toCreatePriceQuantity,
                        productEntity
                    )
                )
            } catch (e) {
                await queryRunner.rollbackTransaction();
                throw new HttpException(
                  DATABASE_CONNECTION_EXCEPTION,
                  HttpStatus.BAD_REQUEST
                );
            }
        }
    }

    private getToDeletePriceQuantities(
        oldPriceQuantities: PriceQuantityEntity[],
        newPriceQuantities: CreatePriceQuantityDto[]
    ): PriceQuantityEntity[] {
        const priceQuantityEntities: PriceQuantityEntity[] = [];

        for (const oldPriceQuantity of oldPriceQuantities) {
            let toDelete = true;
            for (const newPriceQuantity of newPriceQuantities) {
                if (
                    oldPriceQuantity.quantity === newPriceQuantity.quantity
                    &&
                    oldPriceQuantity.unitPrice === newPriceQuantity.unitPrice
                ) {
                    toDelete = false;
                }
            }
            if (toDelete) {
                priceQuantityEntities.push(oldPriceQuantity)
            }

        }
        return priceQuantityEntities;
    }

    async deleteByProductId(id: number, queryRunner: QueryRunner) {
        await queryRunner.manager.delete(PriceQuantityEntity, {product: id})
    }

    async createBulkPriceQuantities(priceQuantities: CreatePriceQuantityDto[], productEntity: ProductEntity, queryRunner: QueryRunner) {
        const priceQuantityEntities: PriceQuantityEntity[] = []
        try {
            for (const priceQuantity of priceQuantities) {
                priceQuantityEntities.push(
                    await queryRunner.manager.save(
                        PriceQuantityConverter.fromCreatePriceQuantityToPriceQuantityEntity(priceQuantity, productEntity)
                    )
                )
            }
        } catch (e) {
            return null
        }

        return priceQuantityEntities;
    }
}