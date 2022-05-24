import {DomainBuilder} from "ts-generic-builder";
import {CategoryEntity} from "../../entities/category.entity";
import {ProductEntity} from "../../../products/entities/product.entity";

interface subCategoryDetailsDtoProps {
    id: number;
    name: string;
    products: ProductEntity[];
    mainCategory: CategoryEntity;
}

export class SubCategoryDetailsDto implements subCategoryDetailsDtoProps {

    id: number;
    name: string;
    products: ProductEntity[];
    mainCategory: CategoryEntity;

    constructor(builder: DomainBuilder<subCategoryDetailsDtoProps, SubCategoryDetailsDto> & subCategoryDetailsDtoProps) {
        this.id = builder.id;
        this.name = builder.name;
        this.products = builder.products;
        this.mainCategory = builder.mainCategory;
    }
}