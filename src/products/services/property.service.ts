import {Injectable} from "@nestjs/common";
import {PropertyEntity} from "../entities/property.entity";
import {PropertyConverter} from "../converters/property.converter";
import {PropertyDetailsDto} from "../dto/property/property-details.dto";
import {PropertyRepository} from "../repositories/property.repository";

@Injectable()
export class PropertyService {
    constructor(
        private propertyRepository: PropertyRepository
    ) {
    }

    async createProperty(name: string, queryRunner): Promise<PropertyDetailsDto> {
        let propertyEntity: PropertyEntity = await this.findByName(name)

        if (propertyEntity) {
            return PropertyConverter.fromPropertyEntityToPropertyDetailsDto(propertyEntity)
        }

        propertyEntity = PropertyConverter.fromCreatePropertyDtoToPropertyEntity(name)

        return PropertyConverter.fromPropertyEntityToPropertyDetailsDto(await queryRunner.manager.save(propertyEntity));
    }

    async findByName(name: string): Promise<PropertyEntity> {
        return this.propertyRepository.findOne({where: {name: name.toLowerCase()}});
    }
}