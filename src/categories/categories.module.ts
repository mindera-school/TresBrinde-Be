import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CategoriesController} from "./categories.controller";
import {CategoriesService} from "./categories.service";
import {CategoryRepository} from "./repository/category.repository";
import {SubCategoryRepository} from "./repository/subCategory.repository";

@Module({
    imports: [TypeOrmModule.forFeature([CategoryRepository, SubCategoryRepository])],
    controllers: [CategoriesController],
    providers: [
        CategoriesService
    ],
    exports: [CategoriesService]
})
export class CategoriesModule {
}
