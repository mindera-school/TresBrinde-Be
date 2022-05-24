import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {TableImagesRepository} from "../repositories/tableImages.repository";
import {ProductEntity} from "../entities/product.entity";
import {TableImageConverter} from "../converters/tableImage.converter";
import {TableImagesEntity} from "../entities/tableImages.entity";

@Injectable()
export class TableImagesService {
    constructor(
        private tableImagesRepository: TableImagesRepository,
    ) {
    }

    async create(productEntity: ProductEntity, path: string) {
        const tableImageEntity: TableImagesEntity = TableImageConverter
            .fromCreateTableImageDtoToTableImageEntity(path, productEntity)

        return await this.tableImagesRepository.save(tableImageEntity)
    }

    async findOne(id: number) {
        return TableImageConverter.fromTableImageEntityToTableImageDetailsDto(
            await this.tableImagesRepository.findOne({where: {id: id}})
        )
    }

    async remove(id: number) {
        const tableImage = await this.tableImagesRepository.findOne({where: {id: id}})

        if (tableImage.image) {
            try {
                const fs = require('fs')
                fs.unlinkSync(tableImage.image)
            } catch (e) {
                throw new HttpException("File was not found", HttpStatus.NOT_FOUND)
            }
        }

        this.tableImagesRepository.delete(id)
            .then(() => ({statusCode: HttpStatus.OK}))
            .catch(() => ({statusCode: HttpStatus.NOT_MODIFIED}))
    }

    async getAllTableImagesByProductId(productId: number) {
        return this.tableImagesRepository.find({where: {product: productId}})
    }
}