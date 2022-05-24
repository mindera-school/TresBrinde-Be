import {DomainBuilder} from "ts-generic-builder";

interface TableImagesDetailsDtoProps {
    id: number;
    image: string;

}

export class TableImagesDetailsDto implements TableImagesDetailsDtoProps {

    constructor(builder: DomainBuilder<TableImagesDetailsDtoProps, TableImagesDetailsDto> & TableImagesDetailsDtoProps) {
        this.id = builder.id;
        this.image = builder.image;
    }

    id: number;
    image: string;

}