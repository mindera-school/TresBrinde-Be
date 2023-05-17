import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  CATEGORY_ALREADY_EXISTS_EXCEPTION,
  CATEGORY_NOT_FOUND_EXCEPTION,
  DATABASE_CONNECTION_EXCEPTION,
  SUBCATEGORY_ALREADY_EXISTS_EXCEPTION,
  SUBCATEGORY_NOT_FOUND_EXCEPTION,
} from "../constants";
import { CategoriesConverter } from "./categories.converter";

import { CategoryRepository } from "./repository/category.repository";
import { SubCategoryRepository } from "./repository/subCategory.repository";

import { CategoryEntity } from "./entities/category.entity";
import { SubCategoryEntity } from "./entities/subCategory.entity";

import { CreateCategoryDto } from "./dto/categories/CreateCategory.Dto";
import { UpdateCategoryDto } from "./dto/categories/UpdateCategory.Dto";
import { CategoryDetailsDto } from "./dto/categories/CategoryDetails.Dto";
import { PaginatedCategoriesDto } from "./dto/categories/PaginatedCategories.Dto";

import { CreateSubCategoryDto } from "./dto/subCategories/CreateSubCategory.Dto";
import { UpdateSubCategoryDto } from "./dto/subCategories/UpdateSubCategory.Dto";
import { SubCategoryDetailsDto } from "./dto/subCategories/SubCategoryDetails.Dto";
import { PaginatedSubCategoriesDto } from "./dto/subCategories/PaginatedSubCategories.Dto";

import { SingleFileToCategoryDto } from "../files/dto/singleFileToCategory.dto";
import { QueryRunner } from "typeorm";
import {
  ApiTags,
  ApiResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
} from "@nestjs/swagger";

@Injectable()
@ApiTags("Categories")
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
    @InjectRepository(SubCategoryRepository)
    private subCategoryRepository: SubCategoryRepository
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto
  ): Promise<CategoryDetailsDto> {
    if (
      await this.categoryRepository.findOne({
        where: { name: createCategoryDto.name.toLowerCase().trim() },
      })
    ) {
      throw new HttpException(
        CATEGORY_ALREADY_EXISTS_EXCEPTION,
        HttpStatus.CONFLICT
      );
    }

    let categoryEntity: CategoryEntity =
      CategoriesConverter.fromCreateCategoryDtoToCategoryEntity(
        createCategoryDto
      );

    try {
      categoryEntity = await this.categoryRepository.save(categoryEntity);
    } catch (e) {
      throw new HttpException(
        DATABASE_CONNECTION_EXCEPTION,
        HttpStatus.BAD_REQUEST
      );
    }

    return CategoriesConverter.fromCategoryEntityToCategoryDetailsDto(
      categoryEntity
    );
  }

  async createSubCategory(
    createSubCategoryDto: CreateSubCategoryDto
  ): Promise<SubCategoryDetailsDto> {
    if (
      await this.subCategoryRepository.findOne({
        where: { name: createSubCategoryDto.name },
      })
    ) {
      throw new HttpException(
        SUBCATEGORY_ALREADY_EXISTS_EXCEPTION,
        HttpStatus.CONFLICT
      );
    }

    const category: CategoryEntity =
      CategoriesConverter.fromCategoryDetailsDtoToCategoryEntity(
        await this.findCategory(createSubCategoryDto.mainCategory)
      );

    let subCategoryEntity: SubCategoryEntity =
      CategoriesConverter.fromCreateSubCategoryDtoToSubCategoryEntity(
        createSubCategoryDto,
        category
      );

    try {
      subCategoryEntity = await this.subCategoryRepository.save(
        subCategoryEntity
      );
    } catch (e) {
      throw new HttpException(
        DATABASE_CONNECTION_EXCEPTION,
        HttpStatus.BAD_REQUEST
      );
    }

    return CategoriesConverter.fromSubCategoryEntityToSubCategoryDetailsDto(
      subCategoryEntity
    );
  }

  async getPaginatedCategories(
    limit: number,
    page: number
  ): Promise<PaginatedCategoriesDto> {
    const categoryEntities: CategoryEntity[] =
      await this.categoryRepository.getPaginatedCategories(limit, page);

    let paginatedCategories: PaginatedCategoriesDto =
      new PaginatedCategoriesDto();
    paginatedCategories.categories = [];

    for (const element of categoryEntities) {
      paginatedCategories.categories.push(element);
    }

    return paginatedCategories;
  }

  async getPaginatedSubCategories(
    limit: number,
    page: number,
    categoryId: number
  ): Promise<PaginatedSubCategoriesDto> {
    const subCategoryEntities =
      await this.subCategoryRepository.getPaginatedSubCategories(
        categoryId,
        limit,
        page
      );

    let paginatedSubCategories: PaginatedSubCategoriesDto =
      new PaginatedSubCategoriesDto();
    paginatedSubCategories.subCategories = [];

    for (const element of subCategoryEntities) {
      paginatedSubCategories.subCategories.push(element);
    }

    return paginatedSubCategories;
  }

  async findCategory(id: number): Promise<CategoryDetailsDto> {
    const categoryEntity: CategoryEntity =
      await this.categoryRepository.findOne(id, {
        relations: ["subCategories"],
      });

    if (!categoryEntity) {
      throw new HttpException(
        CATEGORY_NOT_FOUND_EXCEPTION,
        HttpStatus.NOT_FOUND
      );
    }

    return CategoriesConverter.fromCategoryEntityToCategoryDetailsDto(
      categoryEntity
    );
  }

  async findSubCategory(id: number): Promise<SubCategoryDetailsDto> {
    const subCategoryEntity: SubCategoryEntity =
      await this.subCategoryRepository.findOne(id);

    if (!subCategoryEntity) {
      throw new HttpException(
        SUBCATEGORY_NOT_FOUND_EXCEPTION,
        HttpStatus.NOT_FOUND
      );
    }

    return CategoriesConverter.fromSubCategoryEntityToSubCategoryDetailsDto(
      subCategoryEntity
    );
  }

  async updateCategory(
    id: number,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<CategoryDetailsDto> {
    let categoryEntity: CategoryEntity =
      CategoriesConverter.fromCategoryDetailsDtoToCategoryEntity(
        await this.findCategory(id)
      );

    categoryEntity.name = updateCategoryDto.name;
    categoryEntity.description = updateCategoryDto.description;

    try {
      categoryEntity = await this.categoryRepository.save(categoryEntity);
    } catch (e) {
      throw new HttpException(
        DATABASE_CONNECTION_EXCEPTION,
        HttpStatus.BAD_REQUEST
      );
    }

    return CategoriesConverter.fromCategoryEntityToCategoryDetailsDto(
      categoryEntity
    );
  }

  async updateSubCategory(
    id: number,
    updateSubCategoryDto: UpdateSubCategoryDto
  ): Promise<SubCategoryDetailsDto> {
    let subCategoryEntity: SubCategoryEntity =
      CategoriesConverter.fromSubCategoryDetailsDtoToSubCategoryEntity(
        await this.findSubCategory(id)
      );

    subCategoryEntity.name = updateSubCategoryDto.name;
    subCategoryEntity.mainCategory =
      CategoriesConverter.fromCategoryDetailsDtoToCategoryEntity(
        await this.findCategory(updateSubCategoryDto.mainCategory)
      );

    try {
      subCategoryEntity = await this.categoryRepository.save(subCategoryEntity);
    } catch (e) {
      throw new HttpException(
        DATABASE_CONNECTION_EXCEPTION,
        HttpStatus.BAD_REQUEST
      );
    }

    return CategoriesConverter.fromSubCategoryEntityToSubCategoryDetailsDto(
      subCategoryEntity
    );
  }

  async removeCategory(id: number) {
    const category: CategoryEntity = await this.categoryRepository.findOne({
      where: { id: id },
    });

    if (!category) {
      throw new HttpException(
        CATEGORY_NOT_FOUND_EXCEPTION,
        HttpStatus.NOT_FOUND
      );
    }

    await this.categoryRepository
      .remove(category)
      .then(() => ({ statusCode: HttpStatus.OK }))
      .catch(() => ({ statusCode: HttpStatus.NOT_MODIFIED }));
  }

  async removeSubCategory(id: number) {
    const subCategory: SubCategoryEntity =
      await this.subCategoryRepository.findOne({ where: { id: id } });

    if (!subCategory) {
      throw new HttpException(
        SUBCATEGORY_NOT_FOUND_EXCEPTION,
        HttpStatus.NOT_FOUND
      );
    }
    await this.subCategoryRepository
      .remove(subCategory)
      .then(() => ({ statusCode: HttpStatus.OK }))
      .catch(() => ({ statusCode: HttpStatus.NOT_MODIFIED }));
  }

  async addImageToCategory(
    body: SingleFileToCategoryDto,
    file: Express.Multer.File
  ) {
    const categoryEntity: CategoryEntity =
      await this.categoryRepository.findOne({ where: { id: body.categoryId } });

    if (!categoryEntity) {
      throw new HttpException(
        CATEGORY_NOT_FOUND_EXCEPTION,
        HttpStatus.NOT_FOUND
      );
    }

    if (categoryEntity.image) {
      const fs = require("fs");
      fs.unlinkSync(categoryEntity.image);
    }

    categoryEntity.image = file.path;
    await this.categoryRepository.save(categoryEntity);

    return CategoriesConverter.fromCategoryEntityToCategoryDetailsDto(
      categoryEntity
    );
  }

  async removeCategoryImage(id: number) {
    const categoryEntity: CategoryEntity =
      await this.categoryRepository.findOne({ where: { id: id } });

    if (!categoryEntity) {
      throw new HttpException(
        CATEGORY_NOT_FOUND_EXCEPTION,
        HttpStatus.NOT_FOUND
      );
    }

    if (categoryEntity.image) {
      try {
        const fs = require("fs");
        fs.unlinkSync(categoryEntity.image);
      } catch (e) {
        throw new HttpException("File was not found", HttpStatus.NOT_FOUND);
      }
    }

    categoryEntity.image = null;

    await this.categoryRepository.save(categoryEntity);

    return CategoriesConverter.fromCategoryEntityToCategoryDetailsDto(
      categoryEntity
    );
  }

  async findOrCreateCategory(
    category: CreateCategoryDto,
    queryRunner: QueryRunner
  ) {
    let categoryEntity: CategoryEntity = await this.categoryRepository.findOne({
      where: { name: category.name.toLowerCase().trim() },
    });

    if (!categoryEntity) {
      categoryEntity =
        CategoriesConverter.fromCreateCategoryDtoToCategoryEntity(category);
      try {
        categoryEntity = await queryRunner.manager.save(
          CategoryEntity,
          categoryEntity
        );
      } catch (e) {
        return null;
      }
    }

    return CategoriesConverter.fromCategoryEntityToCategoryDetailsDto(
      categoryEntity
    );
  }

  async findOrCreateSubCategory(
    subCategory: CreateCategoryDto,
    categoryEntity: CategoryEntity | CategoryDetailsDto,
    queryRunner: QueryRunner
  ) {
    let subCategoryEntity: SubCategoryEntity =
      await this.subCategoryRepository.findOne({
        where: { name: subCategory.name.toLowerCase().trim() },
      });

    if (!subCategoryEntity) {
      subCategoryEntity =
        CategoriesConverter.fromCreateCategoryDtoToSubCategoryEntity(
          subCategory,
          categoryEntity
        );
      try {
        subCategoryEntity = await queryRunner.manager.save(
          SubCategoryEntity,
          subCategoryEntity
        );
      } catch (e) {
        return null;
      }
    }

    return CategoriesConverter.fromSubCategoryEntityToSubCategoryDetailsDto(
      subCategoryEntity
    );
  }
}
