import {
  CATEGORY_NOT_CREATED_EXCEPTION,
  DATABASE_CONNECTION_EXCEPTION,
  PRICE_QUANTITY_NOT_CREATED_EXCEPTION,
  PRODUCT_ALREADY_EXISTS_EXCEPTION,
  PRODUCT_NOT_FOUND_EXCEPTION,
  PROPERTY_NOT_CREATED_EXCEPTION,
  SUBCATEGORY_NOT_CREATED_EXCEPTION,
} from "../../constants";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CategoriesConverter } from "../../categories/categories.converter";

import { ProductRepository } from "../repositories/product.repository";

import { ProductEntity } from "../entities/product.entity";
import { SubCategoryEntity } from "../../categories/entities/subCategory.entity";

import { CategoriesService } from "../../categories/categories.service";
import { PriceQuantityService } from "./priceQuantity.service";
import { ProductPropertyService } from "./productProperty.service";

import { CreateProductDto } from "../dto/products/create-product.dto";
import { SingleFileToProductDto } from "../../files/dto/singleFileToProduct.dto";

import { ProductDetailsDto } from "../dto/products/product-details.dto";
import { SubCategoryDetailsDto } from "../../categories/dto/subCategories/SubCategoryDetails.Dto";
import { PriceQuantityDetailsDto } from "../dto/priceQuantity/priceQuantity-details.dto";
import { ProductPropertyDetailsDto } from "../dto/productProperties/productProperty-details.dto";

import { ProductConverter } from "../converters/product.converter";
import { PriceQuantityConverter } from "../converters/priceQuantity.converter";
import { ProductPropertyConverter } from "../converters/productProperty.converter";

import { Connection } from "typeorm";
import { SearchProductPropsDto } from "../dto/products/search-product-props.dto";
import { PaginatedProductDto } from "../dto/products/paginated-product.dto";
import { UpdateProductDto } from "../dto/products/update-product.dto";
import { TableImagesService } from "./tableImages.service";
import { TableImagesDetailsDto } from "../dto/tableImages/tableImage-details.dto";
import { TableImageConverter } from "../converters/tableImage.converter";
import { CreateBulkProductsDto } from "../dto/products/createBulkProducts.dto";
import { CategoryEntity } from "../../categories/entities/category.entity";
import { AddWebImageToProductDto } from "src/files/dto/addWebImageToProduct.dto";
import * as validUrl from "valid-url";
import { ProductNotFoundDto } from "src/errorDTOs/productNotFound.Dto";
import { FileNotFoundDto } from "src/errorDTOs/fileNotFound.Dto";
import { DatabaseConnectionFailedDto } from "src/errorDTOs/databaseConnectionFailed.Dto";
import { CannotAddImageToPropertyDto } from "src/errorDTOs/cannotAddImageToProperty.Dto";

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private productPropertyService: ProductPropertyService,
    private priceQuantityService: PriceQuantityService,
    private categoriesService: CategoriesService,
    private tableImagesService: TableImagesService,
    private connection: Connection
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ProductDetailsDto> {
    const productPropertyDetailsDtoList: ProductPropertyDetailsDto[] = [];
    const priceQuantityDetailsDtoList: PriceQuantityDetailsDto[] = [];
    const subCategoryDetailsDtoList: SubCategoryDetailsDto[] = [];
    const tableImagesDetailsDtoList: TableImagesDetailsDto[] = [];

    const subCategoryEntityList: SubCategoryEntity[] = [];
    let productEntity: ProductEntity;

    if (await this.findByReference(createProductDto.reference)) {
      throw new HttpException(
        PRODUCT_ALREADY_EXISTS_EXCEPTION,
        HttpStatus.CONFLICT
      );
    }

    for (const category of createProductDto.subCategories) {
      const subCategory: SubCategoryEntity =
        await this.categoriesService.findSubCategory(category);

      subCategoryEntityList.push(subCategory);
      subCategoryDetailsDtoList.push(
        CategoriesConverter.fromSubCategoryEntityToSubCategoryDetailsDto(
          subCategory
        )
      );
    }

    productEntity = ProductConverter.fromProductCreateDtoToProductEntity(
      createProductDto,
      subCategoryEntityList
    );

    //Start transaction
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      productEntity = await queryRunner.manager.save(productEntity);
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        DATABASE_CONNECTION_EXCEPTION,
        HttpStatus.BAD_REQUEST
      );
    }

    for (const priceQuantityEntity of await this.priceQuantityService.createPriceQuantities(
      createProductDto.priceQuantities,
      productEntity,
      queryRunner
    )) {
      priceQuantityDetailsDtoList.push(
        PriceQuantityConverter.fromPriceQuantityEntityToPriceQuantityDetailsDto(
          priceQuantityEntity
        )
      );
    }

    for (const productPropertyEntity of await this.productPropertyService.createProductProperties(
      createProductDto.productProperties,
      productEntity,
      queryRunner
    )) {
      productPropertyDetailsDtoList.push(
        ProductPropertyConverter.fromProductPropertyEntityToProductPropertyDetailsDto(
          productPropertyEntity
        )
      );
    }

    await queryRunner.commitTransaction();
    await queryRunner.release();
    return ProductConverter.fromProductEntityToProductDetailsDto(
      productEntity,
      subCategoryDetailsDtoList,
      priceQuantityDetailsDtoList,
      productPropertyDetailsDtoList,
      tableImagesDetailsDtoList
    );
  }

  async processInBatch(
    products: CreateBulkProductsDto[]
  ): Promise<CreateBulkProductsDto[]> {
    const subCategoryEntityList: SubCategoryEntity[] = [];
    const rejectedProducts = [];
    let productEntity: ProductEntity;
    let flag = false;

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    for (const createBulkProductDto of products) {
      if (!queryRunner.isTransactionActive) {
        await queryRunner.startTransaction();
      }

      if (await this.findByReference(createBulkProductDto.reference)) {
        rejectedProducts.push([
          createBulkProductDto.reference,
          PRODUCT_ALREADY_EXISTS_EXCEPTION,
        ]);
        continue;
      }

      const category: CategoryEntity =
        await this.categoriesService.findOrCreateCategory(
          createBulkProductDto.mainCategory,
          queryRunner
        );

      if (!category) {
        rejectedProducts.push([
          createBulkProductDto.reference,
          CATEGORY_NOT_CREATED_EXCEPTION,
        ]);
        await queryRunner.rollbackTransaction();
        continue;
      }

      for (const subCategory of createBulkProductDto.subCategories) {
        const subCategoryEntity: SubCategoryEntity =
          await this.categoriesService.findOrCreateSubCategory(
            subCategory,
            category,
            queryRunner
          );

        if (!subCategoryEntity) {
          flag = true;
          break;
        }

        subCategoryEntityList.push(subCategoryEntity);
      }

      if (flag) {
        rejectedProducts.push([
          createBulkProductDto.reference,
          SUBCATEGORY_NOT_CREATED_EXCEPTION,
        ]);
        await queryRunner.rollbackTransaction();
        continue;
      }

      productEntity = ProductConverter.fromCreateBulkProductsDtoToProductEntity(
        createBulkProductDto,
        subCategoryEntityList
      );

      try {
        productEntity = await queryRunner.manager.save(productEntity);
      } catch (e) {
        rejectedProducts.push([
          createBulkProductDto.reference,
          PRODUCT_ALREADY_EXISTS_EXCEPTION,
        ]);
        await queryRunner.rollbackTransaction();
        continue;
      }

      const priceQuantityEntity =
        this.priceQuantityService.createBulkPriceQuantities(
          createBulkProductDto.priceQuantities,
          productEntity,
          queryRunner
        );

      if (!priceQuantityEntity) {
        rejectedProducts.push([
          createBulkProductDto.reference,
          PRICE_QUANTITY_NOT_CREATED_EXCEPTION,
        ]);
        await queryRunner.rollbackTransaction();
        continue;
      }

      const productPropertyEntity =
        this.productPropertyService.createBulkProductProperties(
          createBulkProductDto.productProperties,
          productEntity,
          queryRunner
        );

      if (!productPropertyEntity) {
        rejectedProducts.push([
          createBulkProductDto.reference,
          PROPERTY_NOT_CREATED_EXCEPTION,
        ]);
        await queryRunner.rollbackTransaction();
        continue;
      }

      await queryRunner.commitTransaction();
    }

    await queryRunner.release();
    return rejectedProducts;
  }

  async findAll(
    limit: number,
    page: number,
    searchProductDto: SearchProductPropsDto
  ): Promise<PaginatedProductDto> {
    const paginatedProducts: PaginatedProductDto = new PaginatedProductDto();
    paginatedProducts.products = [];

    const productEntity: ProductEntity[] =
      await this.productRepository.getPaginatedProducts(
        limit,
        page,
        searchProductDto
      );

    for (const element of productEntity) {
      const productPropertyDetailsDtoList: ProductPropertyDetailsDto[] = [];
      const priceQuantityDetailsDtoList: PriceQuantityDetailsDto[] = [];
      const subCategoryDetailsDtoList: SubCategoryDetailsDto[] = [];
      const tableImageDetailsDtoList: TableImagesDetailsDto[] = [];

      for (const subCategory of element.subCategories) {
        subCategoryDetailsDtoList.push(
          CategoriesConverter.fromSubCategoryEntityToSubCategoryDetailsDto(
            subCategory
          )
        );
      }
      for (const priceQuantity of element.priceQuantities) {
        priceQuantityDetailsDtoList.push(
          PriceQuantityConverter.fromPriceQuantityEntityToPriceQuantityDetailsDto(
            priceQuantity
          )
        );
      }
      for (const productProperty of element.productProperties) {
        productPropertyDetailsDtoList.push(
          ProductPropertyConverter.fromProductPropertyEntityToProductPropertyDetailsDto(
            productProperty
          )
        );
      }
      for (const tableImage of element.tableImages) {
        tableImageDetailsDtoList.push(
          TableImageConverter.fromTableImageEntityToTableImageDetailsDto(
            tableImage
          )
        );
      }

      paginatedProducts.products.push(
        await ProductConverter.fromProductEntityToProductDetailsDto(
          element,
          subCategoryDetailsDtoList,
          priceQuantityDetailsDtoList,
          productPropertyDetailsDtoList,
          tableImageDetailsDtoList
        )
      );
    }

    return paginatedProducts;
  }

  async findOne(id: number): Promise<ProductDetailsDto> {
    const productPropertyDetailsDtoList: ProductPropertyDetailsDto[] = [];
    const priceQuantityDetailsDtoList: PriceQuantityDetailsDto[] = [];
    const subCategoryDetailsDtoList: SubCategoryDetailsDto[] = [];
    const tableImageDetailsDtoList: TableImagesDetailsDto[] = [];

    const productEntity: ProductEntity = await this.productRepository.findOne({
      relations: [
        "subCategories",
        "productProperties",
        "priceQuantities",
        "tableImages",
      ],
      where: { id: id },
    });

    if (!productEntity) {
      throw new HttpException(
        PRODUCT_NOT_FOUND_EXCEPTION,
        HttpStatus.NOT_FOUND
      );
    }

    for (const subCategory of productEntity.subCategories) {
      subCategoryDetailsDtoList.push(
        CategoriesConverter.fromSubCategoryEntityToSubCategoryDetailsDto(
          subCategory
        )
      );
    }

    for (const priceQuantity of productEntity.priceQuantities) {
      priceQuantityDetailsDtoList.push(
        PriceQuantityConverter.fromPriceQuantityEntityToPriceQuantityDetailsDto(
          priceQuantity
        )
      );
    }

    for (const productProperty of productEntity.productProperties) {
      productPropertyDetailsDtoList.push(
        await this.productPropertyService.getProductPropertyById(
          productProperty.id
        )
      );
    }

    for (const tableImage of productEntity.tableImages) {
      tableImageDetailsDtoList.push(
        await this.tableImagesService.findOne(tableImage.id)
      );
    }

    return ProductConverter.fromProductEntityToProductDetailsDto(
      productEntity,
      subCategoryDetailsDtoList,
      priceQuantityDetailsDtoList,
      productPropertyDetailsDtoList,
      tableImageDetailsDtoList
    );
  }

  async findByReference(reference: string): Promise<ProductDetailsDto> {
    const productPropertyDetailsDtoList: ProductPropertyDetailsDto[] = [];
    const priceQuantityDetailsDtoList: PriceQuantityDetailsDto[] = [];
    const subCategoryDetailsDtoList: SubCategoryDetailsDto[] = [];
    const tableImageDetailsDtoList: TableImagesDetailsDto[] = [];

    const productEntity: ProductEntity = await this.productRepository.findOne({
      relations: [
        "subCategories",
        "productProperties",
        "priceQuantities",
        "tableImages",
      ],
      where: { reference: reference },
    });

    if (!productEntity) {
      return null;
    }

    for (const subCategory of productEntity.subCategories) {
      subCategoryDetailsDtoList.push(
        CategoriesConverter.fromSubCategoryEntityToSubCategoryDetailsDto(
          subCategory
        )
      );
    }

    for (const priceQuantity of productEntity.priceQuantities) {
      priceQuantityDetailsDtoList.push(
        PriceQuantityConverter.fromPriceQuantityEntityToPriceQuantityDetailsDto(
          priceQuantity
        )
      );
    }

    for (const productProperty of productEntity.productProperties) {
      productPropertyDetailsDtoList.push(
        await this.productPropertyService.getProductPropertyById(
          productProperty.id
        )
      );
    }

    for (const tableImage of productEntity.tableImages) {
      tableImageDetailsDtoList.push(
        await this.tableImagesService.findOne(tableImage.id)
      );
    }

    return ProductConverter.fromProductEntityToProductDetailsDto(
      productEntity,
      subCategoryDetailsDtoList,
      priceQuantityDetailsDtoList,
      productPropertyDetailsDtoList,
      tableImageDetailsDtoList
    );
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto
  ): Promise<ProductDetailsDto> {
    const productPropertiesDetailsDtoList: ProductPropertyDetailsDto[] = [];
    const priceQuantityDetailsDtoList: PriceQuantityDetailsDto[] = [];
    const tableImageDetailsDtoList: TableImagesDetailsDto[] = [];
    const queryRunner = this.connection.createQueryRunner();

    const productInfo = await this.findOne(id);

    //Start transaction
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const subCategoryEntityList: SubCategoryEntity[] = [];
    const subCategoryDetailsDtoList: SubCategoryDetailsDto[] = [];

    for (const category of updateProductDto.subCategories) {
      const subCategory: SubCategoryEntity =
        await this.categoriesService.findSubCategory(category);

      subCategoryEntityList.push(subCategory);
      subCategoryDetailsDtoList.push(
        CategoriesConverter.fromSubCategoryEntityToSubCategoryDetailsDto(
          subCategory
        )
      );
    }

    const productEntity = ProductConverter.fromUpdateProductDtoToProductEntity(
      id,
      updateProductDto,
      subCategoryEntityList
    );

    // @ts-ignore
    delete productEntity.creator;

    await queryRunner.manager.save(productEntity);

    await this.productPropertyService.updateProductProperties(
      updateProductDto.productProperties,
      queryRunner,
      ProductConverter.fromProductDetailsDtoToProductEntity(
        productInfo,
        await this.productPropertyService.getAllProductPropertiesByProductId(
          productInfo.id
        ),
        await this.priceQuantityService.getAllPriceQuantitiesByProductId(
          productInfo.id
        )
      )
    );

    await this.priceQuantityService.updatePriceQuantity(
      updateProductDto.priceQuantities,
      queryRunner,
      ProductConverter.fromProductDetailsDtoToProductEntity(
        productInfo,
        await this.productPropertyService.getAllProductPropertiesByProductId(
          productInfo.id
        ),
        await this.priceQuantityService.getAllPriceQuantitiesByProductId(
          productInfo.id
        )
      )
    );

    await queryRunner.commitTransaction();

    for (const productPropertyEntity of await this.productPropertyService.getAllProductPropertiesByProductId(
      productEntity.id
    )) {
      productPropertiesDetailsDtoList.push(
        ProductPropertyConverter.fromProductPropertyEntityToProductPropertyDetailsDto(
          productPropertyEntity
        )
      );
    }

    for (const priceQuantityEntity of await this.priceQuantityService.getAllPriceQuantitiesByProductId(
      productEntity.id
    )) {
      priceQuantityDetailsDtoList.push(
        PriceQuantityConverter.fromPriceQuantityEntityToPriceQuantityDetailsDto(
          priceQuantityEntity
        )
      );
    }

    for (const tableImage of await this.tableImagesService.getAllTableImagesByProductId(
      productEntity.id
    )) {
      tableImageDetailsDtoList.push(
        TableImageConverter.fromTableImageEntityToTableImageDetailsDto(
          tableImage
        )
      );
    }

    return ProductConverter.fromProductEntityToProductDetailsDto(
      productEntity,
      subCategoryDetailsDtoList,
      priceQuantityDetailsDtoList,
      productPropertiesDetailsDtoList,
      tableImageDetailsDtoList
    );
  }

  async remove(id: number) {
    const queryRunner = this.connection.createQueryRunner();
    await this.findOne(id);

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.priceQuantityService.deleteByProductId(id, queryRunner);
      await this.productPropertyService.deleteByProductId(id, queryRunner);
      await queryRunner.manager.remove(
        ProductConverter.fromProductDetailsDtoToProductEntity(
          await this.findOne(id)
        )
      );
    } catch (e) {
      await queryRunner.rollbackTransaction();
      return { statusCode: HttpStatus.NOT_MODIFIED };
    }

    await queryRunner.commitTransaction();
    return { statusCode: HttpStatus.OK };
  }

  async addImageToProduct(
    body: SingleFileToProductDto,
    file: Express.Multer.File
  ) {
    const productEntity: ProductEntity = await this.productRepository.findOne(
      body.productId
    );

    if (!productEntity) {
      throw new HttpException(
        PRODUCT_NOT_FOUND_EXCEPTION,
        HttpStatus.NOT_FOUND
      );
    }

    if (body.propertyId) {
      await this.productPropertyService.addImageToProperty(
        body.propertyId,
        file
      );
    } else if (body.isMainImage.toLowerCase() == "true") {
      if (productEntity.mainImage) {
        try {
          const fs = require("fs");
          fs.unlinkSync(productEntity.mainImage);
        } catch (e) {
          throw new HttpException("File was not found", HttpStatus.NOT_FOUND);
        }
      }

      productEntity.mainImage = file.path;

      try {
        await this.productRepository.save(productEntity);
      } catch (e) {
        throw new HttpException(
          DATABASE_CONNECTION_EXCEPTION,
          HttpStatus.BAD_REQUEST
        );
      }
    } else {
      await this.tableImagesService.create(productEntity, file.path);
    }

    return this.findOne(productEntity.id);
  }

  async addWebImageToProduct(body: AddWebImageToProductDto) {
    const productEntity: ProductEntity = await this.productRepository.findOne(
      body.productId
    );

    if (!productEntity) {
      throw new ProductNotFoundDto();
    }

    if (body.propertyId) {
      await this.productPropertyService.addWebImageToProperty(
        body.propertyId,
        body.photo_url
      );
    } else if (body.isMainImage && body.isMainImage === true) {
      if (productEntity.mainImage) {
        const isUrl = validUrl.isWebUri(productEntity.mainImage);
        if (!isUrl) {
          try {
            const fs = require("fs");
            fs.unlinkSync(productEntity.mainImage);
          } catch (e) {
            throw new FileNotFoundDto();
          }
        }
      }

      productEntity.mainImage = body.photo_url;

      try {
        await this.productRepository.save(productEntity);
      } catch (e) {
        throw new DatabaseConnectionFailedDto();
      }
    } else {
      throw new CannotAddImageToPropertyDto();
    }

    return this.productRepository.findOne(productEntity.id);
  }

  async removeImageFromProduct(id: number) {
    await this.tableImagesService.remove(id);
  }
}
