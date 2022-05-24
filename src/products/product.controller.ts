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
    UseInterceptors,
    ValidationPipe,
} from '@nestjs/common';
import {ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags} from '@nestjs/swagger';
import {editFileName, imageFileFilter} from "../files/utils/file.upload";
import {FastifyFileInterceptor} from "../files/singleFile.interceptor";
import {diskStorage} from 'multer';
import {Roles} from "../decorators/roles.decorator";
import {Public} from "../decorators/public.decorator";
import {SearchProductPropsDto} from "./dto/products/search-product-props.dto";
import {ProductDetailsDto} from "./dto/products/product-details.dto";
import {CreateProductDto} from './dto/products/create-product.dto';
import {UpdateProductDto} from './dto/products/update-product.dto';
import {ProductService} from './services/product.service';
import {SingleFileToProductDto} from "../files/dto/singleFileToProduct.dto";
import {UserRole} from "../user/userRole.enum";
import {Request} from 'express';
import {ApiImplicitQuery} from "@nestjs/swagger/dist/decorators/api-implicit-query.decorator";
import {CreateBulkProductsDto} from "./dto/products/createBulkProducts.dto";


@ApiTags("Product")
@Controller('product')
@ApiBearerAuth("JWT-auth")
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) {
    }

    @Post()
    @ApiOperation({summary: 'Create product'})
    @Roles(UserRole.Admin)
    async create(@Body(new ValidationPipe()) createProductDto: CreateProductDto): Promise<ProductDetailsDto> {
        return await this.productService.create(createProductDto);
    }

    @Post("/bulk")
    @Public()
    @ApiOperation({summary: 'Create bulk products'})
    @Roles(UserRole.Admin)
    async createBulk(@Body(new ValidationPipe()) createBulkProductsDtoList: CreateBulkProductsDto[]) {
        const bulks: CreateBulkProductsDto[][] = this.splitProductsToBulks(createBulkProductsDtoList)

        const promises = [];
        for (const bulkProducts of bulks) {
            const processInBatchPromise: Promise<CreateBulkProductsDto[]> = this.productService.processInBatch(bulkProducts);
            promises.push(processInBatchPromise);
        }
        return await Promise.all(promises)
    }

    @Get()
    @ApiOperation({summary: 'Get pagination and filtration of products'})
    @Roles(UserRole.User, UserRole.Admin)
    @Public()

    @ApiOperation({summary: 'Paginate Categories'})
    @ApiImplicitQuery({name: "page", description: "The page to return", required: false, type: Number})
    @ApiImplicitQuery({name: "limit", description: "The number of elements to return", required: false, type: Number})

    @ApiImplicitQuery({name: "subCategory", description: "sub Category to filter", required: false, type: Number})
    @ApiImplicitQuery({name: "category", description: "category to filter", required: false, type: Number})
    @ApiImplicitQuery({name: "search", description: "name of product to filter", required: false, type: String})
    findAll(
        @Query("limit", new DefaultValuePipe(20), ParseIntPipe) limit: number,
        @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query("search", new DefaultValuePipe("")) search: string,
        @Query("subCategory", new DefaultValuePipe(0), ParseIntPipe) subCategory: number,
        @Query("category", new DefaultValuePipe(0), ParseIntPipe) category: number,
    ) {
        const searchProductsPropsDto = new SearchProductPropsDto(category, subCategory, search)
        return this.productService.findAll(limit, page, searchProductsPropsDto);
    }


    @Get(':id')
    @ApiOperation({summary: 'get a specific product'})
    @Roles(UserRole.User, UserRole.Admin)
    @Public()
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.productService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update a specific product'})
    @Roles(UserRole.Admin)
    update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
        return this.productService.update(id, updateProductDto);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Deletes a specific product'})
    @Roles(UserRole.Admin)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.productService.remove(id);
    }

    @Delete('/image/:id')
    @ApiOperation({summary: 'Deletes a specific product table image'})
    @Roles(UserRole.Admin)
    removeImage(@Param('id', ParseIntPipe) id: number) {
        return this.productService.removeImageFromProduct(id);
    }

    @Post('addImageToProduct')
    @Roles(UserRole.Admin)
    @ApiConsumes('multipart/form-data')
    @ApiOperation({summary: 'Adds a image to a product'})
    @UseInterceptors(FastifyFileInterceptor('photo_url', {
        storage: diskStorage({
            destination: './images',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }),)
    single(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: SingleFileToProductDto,
        @Req() req: Request,
    ) {
        return this.productService.addImageToProduct(body, file)
    }

    private splitProductsToBulks(arr, bulkSize = 100): CreateBulkProductsDto[][] {
        const bulks: CreateBulkProductsDto[][] = [];
        for (let i = 0; i < Math.ceil(arr.length / bulkSize); i++) {
            bulks.push(arr.slice(i * bulkSize, (i + 1) * bulkSize));
        }
        return bulks
    }
}