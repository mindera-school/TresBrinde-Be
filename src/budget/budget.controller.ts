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
    Query, Req, UploadedFile,
    UseInterceptors
} from "@nestjs/common";
import {BudgetService} from "./services/budget.service";
import {Roles} from "../decorators/roles.decorator";
import {UserRole} from "../user/userRole.enum";
import {IsSameUser} from "../decorators/isSameUser.decorator";
import {CreateBudgetDto} from "./dto/budget/createBudget.dto";
import {Public} from "../decorators/public.decorator";
import {ApiImplicitQuery} from "@nestjs/swagger/dist/decorators/api-implicit-query.decorator";
import {UpdateProductDto} from "../products/dto/products/update-product.dto";
import {UpdateBudgetDto} from "./dto/budget/updateBudget.dto";
import {FastifyFileInterceptor} from "../files/singleFile.interceptor";
import {diskStorage} from "multer";
import {editFileName, imageFileFilter} from "../files/utils/file.upload";
import {SingleFileToProductDto} from "../files/dto/singleFileToProduct.dto";
import {Request} from "express";
import {SingleFileToBudgetDto} from "../files/dto/singleFileToBudget.dto";

@ApiTags("Budget")
@Controller('budget')
@ApiBearerAuth("JWT-auth")
export class BudgetController {
    constructor(
        private readonly budgetService: BudgetService
    ) {
    }

    @Post()
    @Public()
    @IsSameUser()
    @Roles(UserRole.Admin, UserRole.User)
    @ApiOperation({summary: 'Create new budget'})
    async createBudget(
        @Body() createBudgetDto: CreateBudgetDto
    ) {
        return this.budgetService.createBudget(createBudgetDto);
    }

    @Get(':id')
    @ApiOperation({summary: 'get a specific budget'})
    @Roles(UserRole.User, UserRole.Admin)
    @IsSameUser()
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.budgetService.getBudget(id)
    }

    @Get()
    @IsSameUser()
    @Roles(UserRole.User, UserRole.Admin)
    @ApiOperation({summary: 'paginate budgets'})
    @ApiImplicitQuery({name: "id", description: "The id of user", required: false, type: Number})
    @ApiImplicitQuery({name: "page", description: "The page to return", required: false, type: Number})
    @ApiImplicitQuery({name: "limit", description: "The number of elements to return", required: false, type: Number})
    findAll(
        @Query("id", new DefaultValuePipe(1), ParseIntPipe) id: number,
        @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query("limit", new DefaultValuePipe(20), ParseIntPipe) limit: number,
    ) {
        return this.budgetService.getPaginatedBudget(id, limit, page);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update a specific Budget'})
    @Roles(UserRole.Admin)
    update(@Param('id', ParseIntPipe) id: number, @Body() updateBudgetDto: UpdateBudgetDto) {
        return this.budgetService.update(id, updateBudgetDto);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Deletes a specific Budget'})
    @Roles(UserRole.Admin)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.budgetService.remove(id)
    }

    @Post('addImageToBudget')
    @Roles(UserRole.Admin)
    @ApiConsumes('multipart/form-data')
    @ApiOperation({summary: 'Adds a image to a budget'})
    @UseInterceptors(FastifyFileInterceptor('photo_url', {
        storage: diskStorage({
            destination: './images',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }),)
    single(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: SingleFileToBudgetDto,
        @Req() req: Request,
    ) {
        return this.budgetService.addImageToBudget(body, file)
    }
}