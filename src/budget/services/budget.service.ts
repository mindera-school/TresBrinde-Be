import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {CreateBudgetDto} from "../dto/budget/createBudget.dto";
import {UserService} from "../../user/user.service";
import {ProductService} from "../../products/services/product.service";
import {InjectRepository} from "@nestjs/typeorm";
import {BudgetRepository} from "../repositories/budget.repository";
import {BudgetConverter} from "../converters/budget.converter";
import {BudgetEntity} from "../entities/budget.entity";
import {Connection} from "typeorm";
import {ProductConverter} from "../../products/converters/product.converter";
import {BudgetProductService} from "./budgetProduct.service";
import { BUDGETNOTFOUND, DATABASE_CONNECTION_EXCEPTION } from "../../constants";
import {BudgetProductDetailsDto} from "../dto/budgetProduct/budgetProductDetails.dto";
import {BudgetProductConverter} from "../converters/budgetProduct.converter";
import {DetailsUserDto} from "../../user/dto/details-user.dto";
import {BudgetDetailsDto} from "../dto/budget/budgetDetails.dto";
import {UpdateBudgetDto} from "../dto/budget/updateBudget.dto";
import {BudgetProductEntity} from "../entities/budgetProduct.entity";
import {SingleFileToBudgetDto} from "../../files/dto/singleFileToBudget.dto";
import {BudgetImageService} from "./budgetImage.service";

@Injectable()
export class BudgetService {
    constructor(
        @InjectRepository(BudgetRepository)
        private budgetRepository: BudgetRepository,
        private budgetProductService: BudgetProductService,
        private budgetImageService: BudgetImageService,
        private productService: ProductService,
        private userService: UserService,
        private connection: Connection,
    ) {
    }

    async createBudget(createBudgetDto: CreateBudgetDto) {
        const budgetProductDetailsDtoList: BudgetProductDetailsDto[] = [];
        let budgetEntity: BudgetEntity;

        createBudgetDto.userId ?
            budgetEntity = BudgetConverter.fromCreateBudgetDtoToBudgetEntity(createBudgetDto,
                await this.userService.findOne(createBudgetDto.userId)
            )
            :
            budgetEntity = BudgetConverter.fromCreateBudgetDtoToBudgetEntity(createBudgetDto)

        //Start transaction
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            await queryRunner.manager.save(budgetEntity)
        } catch (e) {
            await queryRunner.rollbackTransaction()
            throw new HttpException(
              DATABASE_CONNECTION_EXCEPTION,
              HttpStatus.BAD_REQUEST
            );
        }

        for (const budgetProduct of createBudgetDto.productsQuantity) {
            budgetProductDetailsDtoList.push(await this.budgetProductService.create(
                queryRunner,
                budgetEntity,
                budgetProduct.quantity,
                ProductConverter.fromProductDetailsDtoToProductEntity(
                    await this.productService.findOne(budgetProduct.productId)
                )
            ))
        }

        await queryRunner.commitTransaction()

        return BudgetConverter.fromBudgetEntityToBudgetDetailsDto(budgetEntity, budgetProductDetailsDtoList)
    }

    async getBudget(id: number) {
        const budgetImages: string[] = [];
        const budgetProductDetailsDtoList: BudgetProductDetailsDto[] = [];
        const budgetEntity: BudgetEntity = await this.budgetRepository.findOne({
            where: {id: id},
            relations: ["products", "images"]
        })

        if (!budgetEntity) {
            throw new HttpException(BUDGETNOTFOUND, HttpStatus.NOT_FOUND)
        }

        for (const budgetProduct of budgetEntity.products) {
            budgetProductDetailsDtoList.push(
                BudgetProductConverter.fromBudgetProductEntityToBudgetProductDetailsDto(
                    budgetProduct
                )
            )
        }

        for (const images of budgetEntity.images) {
            budgetImages.push(images.path)
        }

        return BudgetConverter.fromBudgetEntityToBudgetDetailsDto(budgetEntity, budgetProductDetailsDtoList, budgetImages)

    }

    async getPaginatedBudget(id: number, limit: number, page: number) {
        const budgetDetailsDtoList: BudgetDetailsDto[] = [];
        const budgetImages: string[] = [];
        let user: DetailsUserDto;

        if (id) {
            user = await this.userService.findOne(id)
        }

        const budgetEntities: BudgetEntity[] = await this.budgetRepository.paginateBudgets(user.email, limit, page)


        for (const budgetEntity of budgetEntities) {
            const budgetProductDetailsDtoList: BudgetProductDetailsDto[] = [];

            for (const product of budgetEntity.products) {

                budgetProductDetailsDtoList.push(
                    BudgetProductConverter.fromBudgetProductEntityToBudgetProductDetailsDto(product)
                )
            }
            for (const images of budgetEntity.images) {
                budgetImages.push(images.path)
            }

            budgetDetailsDtoList.push(
                BudgetConverter.fromBudgetEntityToBudgetDetailsDto(budgetEntity, budgetProductDetailsDtoList, budgetImages)
            )
        }

        return budgetDetailsDtoList
    }

    async update(id: number, updateBudgetDto: UpdateBudgetDto) {
        const budgetImages: string[] = [];
        const budgetInfo: BudgetDetailsDto = await this.getBudget(id)
        const budgetProductDetailsDtoList: BudgetProductDetailsDto[] = [];

        //Start transaction
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect()
        await queryRunner.startTransaction()

        let budgetEntity = BudgetConverter.fromUpdateBudgetDtoToBudgetEntity(id, updateBudgetDto)

        try {
            budgetEntity = await queryRunner.manager.save(budgetEntity)
        } catch (e) {
            await queryRunner.rollbackTransaction()
            throw new HttpException(
              DATABASE_CONNECTION_EXCEPTION,
              HttpStatus.BAD_REQUEST
            );
        }

        await queryRunner.manager.delete(BudgetProductEntity, {budget: id})

        for (const budgetProduct of updateBudgetDto.productsQuantity) {
            budgetProductDetailsDtoList.push(
                await this.budgetProductService.create(
                    queryRunner,
                    budgetEntity,
                    budgetProduct.quantity,
                    ProductConverter.fromProductDetailsDtoToProductEntity(
                        await this.productService.findOne(budgetProduct.productId)
                    )
                )
            )
        }

        for (const images of budgetEntity.images) {
            budgetImages.push(images.path)
        }

        await queryRunner.commitTransaction()
        return BudgetConverter.fromBudgetEntityToBudgetDetailsDto(budgetEntity, budgetProductDetailsDtoList, budgetImages)
    }


    async remove(id: number) {
        await this.getBudget(id)

        await this.budgetRepository.delete(id)
            .then(() => ({statusCode: HttpStatus.OK}))
            .catch(() => ({statusCode: HttpStatus.NOT_MODIFIED}))
    }

    async addImageToBudget(body: SingleFileToBudgetDto, file: Express.Multer.File) {
        const budgetEntity: BudgetEntity = await this.budgetRepository.findOne(body.budgetId)

        if (!budgetEntity) {
            throw new HttpException(BUDGETNOTFOUND, HttpStatus.NOT_FOUND)
        }

        await this.budgetImageService.addImage(budgetEntity, file.path)

        return this.getBudget(body.budgetId)
    }
}