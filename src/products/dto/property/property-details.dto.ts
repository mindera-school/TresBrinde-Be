import {DomainBuilder} from "ts-generic-builder";

interface PropertyDetailsDtoProps {
    id: number;
    name: string;

}

export class PropertyDetailsDto implements PropertyDetailsDtoProps {

    constructor(builder: DomainBuilder<PropertyDetailsDtoProps, PropertyDetailsDto> & PropertyDetailsDtoProps) {
        this.id = builder.id;
        this.name = builder.name;
    }

    id: number;
    name: string;

}