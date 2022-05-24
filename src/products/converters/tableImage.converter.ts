import {Builder} from "ts-generic-builder";
import {TableImagesEntity} from "../entities/tableImages.entity";
import {ProductEntity} from "../entities/product.entity";
import {TableImagesDetailsDto} from "../dto/tableImages/tableImage-details.dto";

export class TableImageConverter {
    static fromCreateTableImageDtoToTableImageEntity(image: string, productEntity: ProductEntity): TableImagesEntity {
        return new Builder(TableImagesEntity)
            .with({
                id: null,
                product: productEntity,
                image: image,
            })
            .build()
    }

    static fromTableImageEntityToTableImageDetailsDto(tableImageEntity: TableImagesEntity): TableImagesDetailsDto {
        return new Builder(TableImagesDetailsDto)
            .with({
                id: tableImageEntity.id,
                image: tableImageEntity.image
            })
            .build()
    }
}