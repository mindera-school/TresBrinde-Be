import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiProduces,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { Public } from "../decorators/public.decorator";
import { Roles } from "../decorators/roles.decorator";
import { UserRole } from "../user/userRole.enum";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/categories/CreateCategory.Dto";
import { UpdateCategoryDto } from "./dto/categories/UpdateCategory.Dto";
import { UpdateSubCategoryDto } from "./dto/subCategories/UpdateSubCategory.Dto";
import { CreateSubCategoryDto } from "./dto/subCategories/CreateSubCategory.Dto";
import { SingleFileToCategoryDto } from "../files/dto/singleFileToCategory.dto";
import { editFileName, imageFileFilter } from "../files/utils/file.upload";
import { FastifyFileInterceptor } from "../files/singleFile.interceptor";
import { diskStorage } from "multer";
import { Request } from "express";
import { ApiImplicitQuery } from "@nestjs/swagger/dist/decorators/api-implicit-query.decorator";
import { CategoryDetailsDto } from "./dto/categories/CategoryDetails.Dto";
import {
  CATEGORY_ALREADY_EXISTS_EXCEPTION,
  CATEGORY_NOT_FOUND_EXCEPTION,
  CATEGORY_NOT_REMOVED_EXCEPTION,
  DATABASE_CONNECTION_EXCEPTION,
  OPERATION_FAILED,
  SUBCATEGORY_ALREADY_EXISTS_EXCEPTION,
  SUBCATEGORY_NOT_FOUND_EXCEPTION,
  SUBCATEGORY_NOT_REMOVED_EXCEPTION,
  USER_NOT_AUTORIZED,
} from "src/constants";
import { CategoryAlreadyExistDto } from "src/errorDTOs/categoryAlreadyExists.Dto";
import { DatabaseConnectionFailedDto } from "src/errorDTOs/databaseConnectionFailed.Dto";
import { UserNotAutorizedDto } from "src/errorDTOs/userNotAutorized.Dto";
import { InternalServerErrorDto } from "src/errorDTOs/internalServerError.Dto";
import { SubcategoryAlreadyExistDto } from "src/errorDTOs/subcategoryAlreadyExists.Dto";
import { SubCategoryDetailsDto } from "./dto/subCategories/SubCategoryDetails.Dto";
import { CategoryNotFoundDto } from "src/errorDTOs/categoryNotFound.Dto";
import { PaginatedCategoriesDto } from "./dto/categories/PaginatedCategories.Dto";
import { CategoryNotRemovedDto } from "src/errorDTOs/categoryNotRemoved.Dto";
import { SubcategoryNotFoundDto } from "src/errorDTOs/subcategoryNotFound.Dto";
import { PaginatedSubCategoriesDto } from "./dto/subCategories/PaginatedSubCategories.Dto";

@ApiTags("Categories")
@Controller("categories")
@ApiBearerAuth("JWT-auth")
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Post("category")
  @Roles(UserRole.Admin)
  @ApiOperation({ summary: "Create new category" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Category created successfully",
    type: CategoryDetailsDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: CATEGORY_ALREADY_EXISTS_EXCEPTION,
    type: CategoryAlreadyExistDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: DATABASE_CONNECTION_EXCEPTION,
    type: DatabaseConnectionFailedDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: USER_NOT_AUTORIZED,
    type: UserNotAutorizedDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: OPERATION_FAILED,
    type: InternalServerErrorDto,
  })
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Post("subCategory")
  @Roles(UserRole.Admin)
  @ApiOperation({ summary: "Create new sub category" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Subcategory created successfully",
    type: SubCategoryDetailsDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: SUBCATEGORY_ALREADY_EXISTS_EXCEPTION,
    type: SubcategoryAlreadyExistDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: DATABASE_CONNECTION_EXCEPTION,
    type: DatabaseConnectionFailedDto,
  })
  async createSubCategory(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    return this.categoryService.createSubCategory(createSubCategoryDto);
  }

  @Get("category/:id")
  @Public()
  @Roles(UserRole.Admin, UserRole.User)
  @ApiOperation({ summary: "Get specific category" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Category found successfully",
    type: CategoryDetailsDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CATEGORY_NOT_FOUND_EXCEPTION,
    type: CategoryNotFoundDto,
  })
  async getCategory(@Param("id", ParseIntPipe) id: number) {
    return this.categoryService.findCategory(id);
  }

  @Get("categories")
  @Public()
  @Roles(UserRole.Admin, UserRole.User)
  @ApiOperation({ summary: "Paginate Categories" })
  @ApiImplicitQuery({
    name: "limit",
    description: "The number of elements to return",
    required: false,
    type: Number,
  })
  @ApiImplicitQuery({
    name: "page",
    description: "The page to return",
    required: false,
    type: Number,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Categories retrieved successfully",
    type: PaginatedCategoriesDto,
  })
  async getPaginatedCategories(
    @Query("limit", new DefaultValuePipe(30), ParseIntPipe) limit: number,
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number
  ) {
    return this.categoryService.getPaginatedCategories(limit, page);
  }

  @Get("subCategory/:id")
  @Public()
  @Roles(UserRole.Admin, UserRole.User)
  @ApiOperation({ summary: "Get specific subCategory" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Subcategory found successfully",
    type: SubCategoryDetailsDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: SUBCATEGORY_NOT_FOUND_EXCEPTION,
    type: SubcategoryNotFoundDto,
  })
  async getSubCategory(@Param("id", ParseIntPipe) id: number) {
    return this.categoryService.findSubCategory(id);
  }

  @Get("subCategory")
  @Public()
  @Roles(UserRole.Admin, UserRole.User)
  @ApiOperation({ summary: "Paginate subCategories" })
  @ApiImplicitQuery({
    name: "limit",
    description: "The number of elements to return",
    required: false,
    type: Number,
  })
  @ApiImplicitQuery({
    name: "page",
    description: "The page to return",
    required: false,
    type: Number,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Paginated subcategories retrieved successfully",
    type: PaginatedSubCategoriesDto,
  })
  async getPaginatedSubCategories(
    @Query("categoryId", new DefaultValuePipe(0), ParseIntPipe)
    categoryId: number,
    @Query("limit", new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number
  ) {
    return this.categoryService.getPaginatedSubCategories(
      limit,
      page,
      categoryId
    );
  }

  @Patch("category/:id")
  @Roles(UserRole.Admin)
  @ApiOperation({ summary: "Update a specific category" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Category updated successfully",
    type: CategoryDetailsDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: DATABASE_CONNECTION_EXCEPTION,
    type: DatabaseConnectionFailedDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CATEGORY_NOT_FOUND_EXCEPTION,
    type: CategoryNotFoundDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: USER_NOT_AUTORIZED,
    type: UserNotAutorizedDto,
  })
  async updateCategory(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Patch("subCategory/:id")
  @Roles(UserRole.Admin)
  @ApiOperation({ summary: "Update a specific subCategory" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Subcategory updated successfully",
    type: SubCategoryDetailsDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: DATABASE_CONNECTION_EXCEPTION,
    type: DatabaseConnectionFailedDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: SUBCATEGORY_ALREADY_EXISTS_EXCEPTION,
    type: SubcategoryAlreadyExistDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CATEGORY_NOT_FOUND_EXCEPTION,
    type: CategoryNotFoundDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: USER_NOT_AUTORIZED,
    type: UserNotAutorizedDto,
  })
  async updateSubCategory(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateSubCategoryDto: UpdateSubCategoryDto
  ) {
    return this.categoryService.updateSubCategory(id, updateSubCategoryDto);
  }

  @Delete("category/:id")
  @Roles(UserRole.Admin)
  @ApiOperation({ summary: "Deletes a specific category" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Category removed successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CATEGORY_NOT_FOUND_EXCEPTION,
    type: CategoryNotFoundDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_MODIFIED,
    description: CATEGORY_NOT_REMOVED_EXCEPTION,
    type: CategoryNotRemovedDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: USER_NOT_AUTORIZED,
    type: UserNotAutorizedDto,
  })
  async removeCategory(@Param("id", ParseIntPipe) id: number) {
    return this.categoryService.removeCategory(id);
  }

  @Delete("subCategory/:id")
  @Roles(UserRole.Admin)
  @ApiOperation({ summary: "Deletes a specific subCategory" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Subcategory removed successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: SUBCATEGORY_NOT_FOUND_EXCEPTION,
    type: SubcategoryNotFoundDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_MODIFIED,
    description: SUBCATEGORY_NOT_REMOVED_EXCEPTION,
    type: CategoryNotRemovedDto,
  })
  async removeSubCategory(@Param("id", ParseIntPipe) id: number) {
    return this.categoryService.removeSubCategory(id);
  }

  @Post("addImageCategory")
  @Roles(UserRole.Admin)
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Adds an image to a Category" })
  @UseInterceptors(
    FastifyFileInterceptor("photo_url", {
      storage: diskStorage({
        destination: "./images",
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Image added to category successfully",
    type: CategoryDetailsDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CATEGORY_NOT_FOUND_EXCEPTION,
    type: CategoryNotFoundDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: USER_NOT_AUTORIZED,
    type: UserNotAutorizedDto,
  })
  async addImageToCategory(
    @UploadedFile() file: Express.Multer.File,
    @Body("body") body: SingleFileToCategoryDto,
    @Req() req: Request
  ) {
    return this.categoryService.addImageToCategory(body, file);
  }

  @Delete(":id/image")
  @ApiOperation({ summary: "Deletes a specific image from category" })
  @Roles(UserRole.Admin)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Category image removed successfully",
    type: CategoryDetailsDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CATEGORY_NOT_FOUND_EXCEPTION,
    type: CategoryNotFoundDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: USER_NOT_AUTORIZED,
    type: UserNotAutorizedDto,
  })
  async removeImage(@Param("id", ParseIntPipe) id: number) {
    return this.categoryService.removeCategoryImage(id);
  }
}
