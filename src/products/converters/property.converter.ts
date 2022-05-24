import {PropertyEntity} from "../entities/property.entity";
import {Builder} from "ts-generic-builder";
import {PropertyDetailsDto} from "../dto/property/property-details.dto";

export class PropertyConverter {
    static fromCreatePropertyDtoToPropertyEntity(name: string): PropertyEntity {
        return new Builder(PropertyEntity)
            .with({
                id: null,
                name: name.toLowerCase(),
                productProperty: null,
            })
            .build()
    }

    static fromPropertyEntityToPropertyDetailsDto(propertyEntity: PropertyEntity): PropertyDetailsDto {
        return new Builder(PropertyDetailsDto)
            .with({
                id: propertyEntity.id,
                name: propertyEntity.name
            })
            .build()
    }

    static fromPropertyDetailsDtoToPropertyEntity(propertyDetailsDto: PropertyDetailsDto) {
        return new Builder(PropertyEntity)
            .with({
                id: propertyDetailsDto.id,
                name: propertyDetailsDto.name,
                productProperty: null
            })
            .build();
    }
}