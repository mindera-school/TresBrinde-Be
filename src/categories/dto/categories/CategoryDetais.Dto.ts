import {DomainBuilder} from "ts-generic-builder";
import {SubCategoryEntity} from "../../entities/subCategory.entity";

interface categoryDetailsDtoProps {
    id: number;
    name: string;
    subCategories: SubCategoryEntity[];
    image?: string;
}

export class CategoryDetailsDto implements categoryDetailsDtoProps {


    constructor(builder: DomainBuilder<categoryDetailsDtoProps, CategoryDetailsDto> & categoryDetailsDtoProps) {
        this.id = builder.id;
        this.name = builder.name;
        this.subCategories = builder.subCategories;
        this.image = builder.image
    }

    id: number;
    name: string;
    subCategories: SubCategoryEntity[];
    image?: string;
}