import {DomainBuilder} from "ts-generic-builder";

interface ProductPropertyDetailsDtoProps {

    id: number;
    name: string;
    value: string;
    image: string;
}

export class ProductPropertyDetailsDto implements ProductPropertyDetailsDtoProps {

    constructor(builder: DomainBuilder<ProductPropertyDetailsDtoProps, ProductPropertyDetailsDto> & ProductPropertyDetailsDtoProps) {
        this.id = builder.id;
        this.name = builder.name;
        this.value = builder.value;
        this.image = builder.image;
    }

    id: number;
    name: string;
    value: string;
    image: string;
}