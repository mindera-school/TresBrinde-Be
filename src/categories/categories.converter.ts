import {Builder} from "ts-generic-builder";
import {CategoryEntity} from "./entities/category.entity";
import {CategoryDetailsDto} from "./dto/categories/CategoryDetais.Dto";
import {SubCategoryEntity} from "./entities/subCategory.entity";
import {SubCategoryDetailsDto} from "./dto/subCategories/SubCategoryDetails.Dto";
import {CreateSubCategoryDto} from "./dto/subCategories/CreateSubCategory.Dto";
import {CreateCategoryDto} from "./dto/categories/CreateCategory.Dto";

export class CategoriesConverter {

    static fromCategoryEntityToCategoryDetailsDto(categoryEntity: CategoryEntity): CategoryDetailsDto {
        return new Builder(CategoryDetailsDto)
            .with({
                id: categoryEntity.id,
                name: categoryEntity.name,
                subCategories: categoryEntity.subCategories,
                image: categoryEntity.image
            })
            .build()
    }


    static fromCategoryDetailsDtoToCategoryEntity(categoryDetailsDto: CategoryDetailsDto): CategoryEntity {
        return new Builder(CategoryEntity)
            .with({
                id: categoryDetailsDto.id,
                name: categoryDetailsDto.name,
                subCategories: categoryDetailsDto.subCategories,
                image: categoryDetailsDto.image,
            })
            .build()
    }


    static fromSubCategoryEntityToSubCategoryDetailsDto(subCategoryEntity: SubCategoryEntity): SubCategoryDetailsDto {
        return new Builder(SubCategoryDetailsDto)
            .with({
                id: subCategoryEntity.id,
                name: subCategoryEntity.name,
                mainCategory: subCategoryEntity.mainCategory,
                products: subCategoryEntity.products,
            })
            .build()
    }

    static fromSubCategoryDetailsDtoToSubCategoryEntity(subCategoryDetailsDto: SubCategoryDetailsDto): SubCategoryEntity {
        return new Builder(SubCategoryEntity)
            .with({
                id: subCategoryDetailsDto.id,
                name: subCategoryDetailsDto.name,
                mainCategory: subCategoryDetailsDto.mainCategory,
                products: subCategoryDetailsDto.products,
            })
            .build()
    }

    static fromCreateCategoryDtoToCategoryEntity(createCategoryDto: CreateCategoryDto): CategoryEntity {
        return new Builder(CategoryEntity)
            .with({
                id: null,
                name: createCategoryDto.name.toLowerCase().trim(),
                subCategories: null
            })
            .build()
    }


    static fromCreateSubCategoryDtoToSubCategoryEntity(createSubCategoryDto: CreateSubCategoryDto, category: CategoryEntity): SubCategoryEntity {
        return new Builder(SubCategoryEntity)
            .with({
                id: null,
                name: createSubCategoryDto.name,
                mainCategory: category,
                products: null,
            })
            .build()
    }

    static fromCreateCategoryDtoToSubCategoryEntity(createSubCategory: CreateCategoryDto, category: CategoryEntity): SubCategoryEntity {
        return new Builder(SubCategoryEntity)
            .with({
                id: null,
                name: createSubCategory.name,
                mainCategory: category,
                products: null,
            })
            .build()
    }
}
