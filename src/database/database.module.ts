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

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('POSTGRES_HOST'),
                port: configService.get('POSTGRES_PORT'),
                username: configService.get('POSTGRES_USER'),
                password: configService.get('POSTGRES_PASSWORD'),
                database: configService.get('POSTGRES_DB'),
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