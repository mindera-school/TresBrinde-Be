import { Builder } from "ts-generic-builder";
import { TableImagesEntity } from "../entities/tableImages.entity";
import { ProductEntity } from "../entities/product.entity";
import { TableImagesDetailsDto } from "../dto/tableImages/tableImage-details.dto";
import { ProductPropertyEntity } from "../entities/productProperty.entity";

export class TableImageConverter {
  static fromCreateTableImageDtoToTableImageEntity(
    image: string,
    productEntity: ProductEntity
  ): TableImagesEntity {
    return new Builder(TableImagesEntity)
      .with({
        id: null,
        product: productEntity,
        image: image,
      })
      .build();
  }

  static fromTableImageEntityToTableImageDetailsDto(
    tableImageEntity: TableImagesEntity
  ): TableImagesDetailsDto {
    return new Builder(TableImagesDetailsDto)
      .with({
        id: tableImageEntity.id,
        // This part of the code is a temporary measure for front-end problem
        // TODO 1: FrontEnd needs to catch this information direct on product Properties
        propertyId: null,
        //
        image: tableImageEntity.image,
      })
      .build();
  }

  // This part of the code is a temporary measure for front-end problem
  // TODO 1: FrontEnd needs to catch this information direct on product Properties
  static fromProductPropertyEntityToTableImageDetailsDto(
    productPropertyEntity: ProductPropertyEntity
  ): TableImagesDetailsDto {
    return new Builder(TableImagesDetailsDto)
      .with({
        id: productPropertyEntity.id,
        propertyId: productPropertyEntity.property.id,
        image: productPropertyEntity.image,
      })
      .build();
  }
  //
}
