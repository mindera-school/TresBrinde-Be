import {ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags} from "@nestjs/swagger";
import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    Req,
    UploadedFile,
    UseInterceptors
} from "@nestjs/common";
import {Public} from "../decorators/public.decorator";
import {Roles} from "../decorators/roles.decorator";
import {UserRole} from "../user/userRole.enum";
import {CategoriesService} from "./categories.service";
import {CreateCategoryDto} from "./dto/categories/CreateCategory.Dto";
import {UpdateCategoryDto} from "./dto/categories/UpdateCategory.Dto";
import {UpdateSubCategoryDto} from "./dto/subCategories/UpdateSubCategory.Dto";
import {CreateSubCategoryDto} from "./dto/subCategories/CreateSubCategory.Dto";
import {SingleFileToCategoryDto} from "../files/dto/singleFileToCategory.dto";
import {editFileName, imageFileFilter} from "../files/utils/file.upload";
import {FastifyFileInterceptor} from "../files/singleFile.interceptor";
import {diskStorage} from "multer";
import {Request} from "express";
import {ApiImplicitQuery} from "@nestjs/swagger/dist/decorators/api-implicit-query.decorator";

@ApiTags("Categories")
@Controller('categories')
@ApiBearerAuth("JWT-auth")
export class CategoriesController {
    constructor(
        private readonly categoryService: CategoriesService
    ) {
    }

    @Post("category")
    @Roles(UserRole.Admin)
    @ApiOperation({summary: 'Create new category'})
    async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.createCategory(createCategoryDto);
    }

    @Post("subCategory")
    @Roles(UserRole.Admin)
    @ApiOperation({summary: 'Create new sub category'})
    async createSubCategory(@Body() createSubCategoryDto: CreateSubCategoryDto) {
        return this.categoryService.createSubCategory(createSubCategoryDto);
    }

    @Get("category/:id")
    @Public()
    @Roles(UserRole.Admin, UserRole.User)
    @ApiOperation({summary: 'Get specific category'})
    async getCategory(
        @Param("id", ParseIntPipe) id: number
    ) {
        return this.categoryService.findCategory(id);
    }

    @Get("categories")
    @Public()
    @Roles(UserRole.Admin, UserRole.User)
    @ApiOperation({summary: 'Paginate Categories'})
    @ApiImplicitQuery({name: "limit", description: "The number of elements to return", required: false, type: Number})
    @ApiImplicitQuery({name: "page", description: "The page to return", required: false, type: Number})
    async getPaginatedCategories(
        @Query("limit", new DefaultValuePipe(30), ParseIntPipe) limit: number,
        @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number
    ) {
        return this.categoryService.getPaginatedCategories(limit, page);
    }

    @Get("subCategory/:id")
    @Public()
    @Roles(UserRole.Admin, UserRole.User)
    @ApiOperation({summary: 'Get specific subCategory'})
    async getSubCategory(
        @Param("id", ParseIntPipe) id: number
    ) {
        return this.categoryService.findSubCategory(id);
    }

    @Get("subCategory")
    @Public()
    @Roles(UserRole.Admin, UserRole.User)
    @ApiOperation({summary: 'Paginate subCategories'})
    @ApiImplicitQuery({name: "limit", description: "The number of elements to return", required: false, type: Number})
    @ApiImplicitQuery({name: "page", description: "The page to return", required: false, type: Number})
    @ApiImplicitQuery({name: "categoryId", description: "The category to filter", required: false, type: Number})
    async getPaginatedSubCategories(
        @Query("categoryId", new DefaultValuePipe(0), ParseIntPipe) categoryId: number,
        @Query("limit", new DefaultValuePipe(20), ParseIntPipe) limit: number,
        @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number
    ) {
        return this.categoryService.getPaginatedSubCategories(limit, page, categoryId);
    }

    @Patch('category/:id')
    @Roles(UserRole.Admin)
    @ApiOperation({summary: 'Update a specific category'})
    async updateCategory(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoryService.updateCategory(id, updateCategoryDto);
    }

    @Patch('subCategory/:id')
    @Roles(UserRole.Admin)
    @ApiOperation({summary: 'Update a specific subCategory'})
    async updateSubCategory(@Param('id', ParseIntPipe) id: number, @Body() updateSubCategoryDto: UpdateSubCategoryDto) {
        return this.categoryService.updateSubCategory(id, updateSubCategoryDto);
    }

    @Delete('category/:id')
    @Roles(UserRole.Admin)
    @ApiOperation({summary: 'Deletes a specific category'})
    async removeCategory(@Param('id', ParseIntPipe) id: number) {
        return this.categoryService.removeCategory(id);
    }

    @Delete('subCategory/:id')
    @Roles(UserRole.Admin)
    @ApiOperation({summary: 'Deletes a specific subCategory'})
    async removeSubCategory(@Param('id', ParseIntPipe) id: number) {
        return this.categoryService.removeSubCategory(id);
    }

    @Post('addImageCategory')
    @Roles(UserRole.Admin)
    @ApiConsumes('multipart/form-data')
    @ApiOperation({summary: 'Adds a image to a Category'})
    @UseInterceptors(FastifyFileInterceptor('photo_url', {
        storage: diskStorage({
            destination: './images',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }),)
    async single(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: SingleFileToCategoryDto,
        @Req() req: Request,
    ) {
        return this.categoryService.addImageToCategory(body, file)
    }

    @Delete(':id/image')
    @ApiOperation({summary: 'Deletes a specific image from category'})
    @Roles(UserRole.Admin)
    async removeImage(@Param('id', ParseIntPipe) id: number) {
        return this.categoryService.removeCategoryImage(id)
    }
}