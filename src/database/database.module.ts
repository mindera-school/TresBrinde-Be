import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {UserEntity} from "../user/entities/user.entity";
import {ProductEntity} from 'src/products/entities/product.entity';
import {CategoryEntity} from "../categories/entities/category.entity";
import {SubCategoryEntity} from "../categories/entities/subCategory.entity";
import {PriceQuantityEntity} from "../products/entities/priceQuantity.entity";
import {ProductPropertyEntity} from "../products/entities/productProperty.entity";
import {PropertyEntity} from "../products/entities/property.entity";
import {TableImagesEntity} from "../products/entities/tableImages.entity";
import {BudgetEntity} from "../budget/entities/budget.entity";
import {BudgetImageEntity} from "../budget/entities/budgetImage.entity";
import {BudgetProductEntity} from "../budget/entities/budgetProduct.entity";
import * as fs from "fs";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('DATABASE_HOST'),
                port: configService.get('DATABASE_PORT'),
                username: configService.get('DATABASE_USER'),
                password: encodeURIComponent(configService.get('DATABASE_PASSWORD')),
                database: configService.get('DATABASE_DB'),
                entities: [
                    UserEntity,
                    CategoryEntity,
                    ProductEntity,
                    PropertyEntity,
                    TableImagesEntity,
                    SubCategoryEntity,
                    PriceQuantityEntity,
                    ProductPropertyEntity,
                    BudgetEntity,
                    BudgetImageEntity,
                    BudgetProductEntity,
                ],
                synchronize: true,
            })
        }),
    ],
})
export class DatabaseModule {
}
