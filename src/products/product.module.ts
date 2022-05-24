import {Module} from '@nestjs/common';
import {ProductService} from './services/product.service';
import {ProductController} from './product.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductRepository} from "./repositories/product.repository";
import {CategoriesModule} from "../categories/categories.module";
import {PriceQuantityRepository} from "./repositories/priceQuantity.repository";
import {ProductPropertyRepository} from "./repositories/productProperties.repository";
import {PropertyRepository} from "./repositories/property.repository";
import {PriceQuantityService} from "./services/priceQuantity.service";
import {PropertyService} from "./services/property.service";
import {ProductPropertyService} from "./services/productProperty.service";
import {TableImagesRepository} from "./repositories/tableImages.repository";
import {TableImagesService} from "./services/tableImages.service";
import {BullModule} from "@nestjs/bull";

@Module({
    imports:
        [
            BullModule.registerQueue({
                name: 'bulkProducts',
            }),
            CategoriesModule,
            TypeOrmModule.forFeature(
                [
                    ProductRepository,
                    PriceQuantityRepository,
                    ProductPropertyRepository,
                    PropertyRepository,
                    TableImagesRepository
                ]
            ),
        ],
    controllers: [ProductController],
    providers: [ProductService, PriceQuantityService, PropertyService, ProductPropertyService, TableImagesService],
    exports: [ProductService]
})

export class ProductModule {
}
