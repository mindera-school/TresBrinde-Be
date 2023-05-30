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
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { editFileName, imageFileFilter } from "../files/utils/file.upload";
import { FastifyFileInterceptor } from "../files/singleFile.interceptor";
import { diskStorage } from "multer";
import { Roles } from "../decorators/roles.decorator";
import { Public } from "../decorators/public.decorator";
import { SearchProductPropsDto } from "./dto/products/search-product-props.dto";
import { ProductDetailsDto } from "./dto/products/product-details.dto";
import { CreateProductDto } from "./dto/products/create-product.dto";
import { UpdateProductDto } from "./dto/products/update-product.dto";
import { ProductService } from "./services/product.service";
import { SingleFileToProductDto } from "../files/dto/singleFileToProduct.dto";
import { UserRole } from "../user/userRole.enum";
import { Request } from "express";
import { ApiImplicitQuery } from "@nestjs/swagger/dist/decorators/api-implicit-query.decorator";
import { CreateBulkProductsDto } from "./dto/products/createBulkProducts.dto";
import {
    CATEGORY_NOT_CREATED_EXCEPTION,
  DATABASE_CONNECTION_EXCEPTION,
  FILE_NOT_FOUND_EXCEPTION,
  FILE_NOT_REMOVED_EXCEPTION,
  ONLY_IMAGE_ALLOWED_EXCEPTION,
  PRODUCT_ALREADY_EXISTS_EXCEPTION,
  PRODUCT_NOT_FOUND_EXCEPTION,
  PRODUCT_NOT_REMOVED_EXCEPTION,
  SUBCATEGORY_NOT_FOUND_EXCEPTION,
  USER_NOT_AUTORIZED,
} from "src/constants";
import { DatabaseConnectionFailedDto } from "src/errorDTOs/databaseConnectionFailed.Dto";
import { ProductAlreadyExistDto } from "src/errorDTOs/productAlreadyExists.Dto";
import { UserNotAutorizedDto } from "src/errorDTOs/userNotAutorized.Dto";
import { CategoryNotCreatedDto } from "src/errorDTOs/categoryNotCreated.Dto";
import { PaginatedProductDto } from "./dto/products/paginated-product.dto";
import { SubcategoryNotFoundDto } from "src/errorDTOs/subcategoryNotFound.Dto";
import { ProductNotRemovedDto } from "src/errorDTOs/productNotRemoved.Dto";
import { FileNotRemovedDto } from "src/errorDTOs/fileNotRemoved.Dto";
import { FileNotFoundDto } from "src/errorDTOs/fileNotFound.Dto";
import { ProductNotFoundDto } from "src/errorDTOs/productNotFound.Dto";
import { OnlyImagesAllowedDto } from "src/errorDTOs/onlyImagesAllowed.Dto";

@ApiTags("Product")
@Controller("product")
@ApiBearerAuth("JWT-auth")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: "Create product" })
  @Roles(UserRole.Admin)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Product created successfully",
    type: ProductDetailsDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: PRODUCT_ALREADY_EXISTS_EXCEPTION,
    type: ProductAlreadyExistDto,
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
  async create(
    @Body(new ValidationPipe()) createProductDto: CreateProductDto
  ): Promise<ProductDetailsDto> {
    return await this.productService.create(createProductDto);
  }

  @Post("/bulk")
  @Public()
  @ApiOperation({ summary: "Create bulk products" })
  @Roles(UserRole.Admin)
  @ApiBody({ type: [CreateBulkProductsDto] })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Products processed in batch",
    type: [CreateBulkProductsDto],
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: PRODUCT_ALREADY_EXISTS_EXCEPTION,
    type: ProductAlreadyExistDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: CATEGORY_NOT_CREATED_EXCEPTION,
    type: CategoryNotCreatedDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: USER_NOT_AUTORIZED,
    type: UserNotAutorizedDto,
  })
  async createBulk(
    @Body(new ValidationPipe())
    createBulkProductsDtoList: CreateBulkProductsDto[]
  ) {
    const bulks: CreateBulkProductsDto[][] = this.splitProductsToBulks(
      createBulkProductsDtoList
    );

    const promises = [];
    for (const bulkProducts of bulks) {
      const processInBatchPromise: Promise<CreateBulkProductsDto[]> =
        this.productService.processInBatch(bulkProducts);
      promises.push(processInBatchPromise);
    }
    return await Promise.all(promises);
  }

  @Get()
  @ApiOperation({ summary: "Get pagination and filtration of products" })
  @Roles(UserRole.User, UserRole.Admin)
  @Public()
  @ApiOperation({ summary: "Paginate Categories" })
  @ApiImplicitQuery({
    name: "page",
    description: "The page to return",
    required: false,
    type: Number,
  })
  @ApiImplicitQuery({
    name: "limit",
    description: "The number of elements to return",
    required: false,
    type: Number,
  })
  @ApiImplicitQuery({
    name: "subCategory",
    description: "sub Category to filter",
    required: false,
    type: Number,
  })
  @ApiImplicitQuery({
    name: "category",
    description: "category to filter",
    required: false,
    type: Number,
  })
  @ApiImplicitQuery({
    name: "search",
    description: "name of product to filter",
    required: false,
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully retrieved paginated products",
    type: [PaginatedProductDto],
  })
  findAll(
    @Query("limit", new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query("search", new DefaultValuePipe("")) search: string,
    @Query("subCategory", new DefaultValuePipe(0), ParseIntPipe)
    subCategory: number,
    @Query("category", new DefaultValuePipe(0), ParseIntPipe) category: number
  ) {
    const searchProductsPropsDto = new SearchProductPropsDto(
      category,
      subCategory,
      search
    );
    return this.productService.findAll(limit, page, searchProductsPropsDto);
  }

  @Get(":id")
  @ApiOperation({ summary: "get a specific product" })
  @Roles(UserRole.User, UserRole.Admin)
  @Public()
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully retrieved product details",
    type: ProductDetailsDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PRODUCT_NOT_FOUND_EXCEPTION,
    type: ProductNotFoundDto,
  })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a specific product" })
  @Roles(UserRole.Admin)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Product updated successfully",
    type: ProductDetailsDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PRODUCT_NOT_FOUND_EXCEPTION,
    type: ProductNotFoundDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: SUBCATEGORY_NOT_FOUND_EXCEPTION,
    type: SubcategoryNotFoundDto,
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
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Deletes a specific product" })
  @Roles(UserRole.Admin)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Product removed successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PRODUCT_NOT_FOUND_EXCEPTION,
    type: ProductNotFoundDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_MODIFIED,
    description: PRODUCT_NOT_REMOVED_EXCEPTION,
    type: ProductNotRemovedDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: USER_NOT_AUTORIZED,
    type: UserNotAutorizedDto,
  })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }

  @Delete("/image/:id")
  @ApiOperation({ summary: "Deletes a specific product table image" })
  @Roles(UserRole.Admin)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Table image removed successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: FILE_NOT_FOUND_EXCEPTION,
    type: FileNotFoundDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_MODIFIED,
    description: FILE_NOT_REMOVED_EXCEPTION,
    type: FileNotRemovedDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: USER_NOT_AUTORIZED,
    type: UserNotAutorizedDto,
  })
  removeImage(@Param("id", ParseIntPipe) id: number) {
    return this.productService.removeImageFromProduct(id);
  }

  @Post("addImageToProduct")
  @Roles(UserRole.Admin)
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Adds a image to a product" })
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
    description: "Image added to product successfully",
    type: ProductDetailsDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ONLY_IMAGE_ALLOWED_EXCEPTION,
    type: OnlyImagesAllowedDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PRODUCT_NOT_FOUND_EXCEPTION,
    type: ProductNotFoundDto,
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
  single(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: SingleFileToProductDto,
    @Req() req: Request
  ) {
    return this.productService.addImageToProduct(body, file);
  }

  private splitProductsToBulks(arr, bulkSize = 100): CreateBulkProductsDto[][] {
    const bulks: CreateBulkProductsDto[][] = [];
    for (let i = 0; i < Math.ceil(arr.length / bulkSize); i++) {
      bulks.push(arr.slice(i * bulkSize, (i + 1) * bulkSize));
    }
    return bulks;
  }
}
