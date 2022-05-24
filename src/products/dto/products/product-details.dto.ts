import {DomainBuilder} from "ts-generic-builder";
import {PriceQuantityDetailsDto} from "../priceQuantity/priceQuantity-details.dto";
import {SubCategoryDetailsDto} from "../../../categories/dto/subCategories/SubCategoryDetails.Dto";
import {ProductPropertyDetailsDto} from "../productProperties/productProperty-details.dto";
import {TableImagesDetailsDto} from "../tableImages/tableImage-details.dto";

interface productDetailsDtoProps {
    id: number;
    reference: string;
    catalogReference: string;
    productName: string;
    description: string;
    keywords: string;
    mainImage: string;
    brand: string;
    price: number;
    material: string;
    minimumQuantity: number;
    subCategories: SubCategoryDetailsDto[];
    priceQuantity: PriceQuantityDetailsDto[];
    productProperty: ProductPropertyDetailsDto[];
    tableImage: TableImagesDetailsDto[]
}

export class ProductDetailsDto implements productDetailsDtoProps {

    constructor(builder: DomainBuilder<productDetailsDtoProps, ProductDetailsDto> & productDetailsDtoProps) {
        this.id = builder.id;
        this.reference = builder.reference;
        this.catalogReference = builder.catalogReference;
        this.productName = builder.productName;
        this.description = builder.description;
        this.keywords = builder.keywords;
        this.mainImage = builder.mainImage;
        this.brand = builder.brand;
        this.price = builder.price;
        this.material = builder.material;
        this.minimumQuantity = builder.minimumQuantity;
        this.subCategories = builder.subCategories;
        this.priceQuantity = builder.priceQuantity;
        this.productProperty = builder.productProperty;
        this.tableImage = builder.tableImage;
    }

    id: number;
    reference: string;
    catalogReference: string;
    productName: string;
    description: string;
    keywords: string;
    mainImage: string;
    brand: string;
    price: number;
    material: string;
    minimumQuantity: number;
    subCategories: SubCategoryDetailsDto[];
    priceQuantity: PriceQuantityDetailsDto[];
    productProperty: ProductPropertyDetailsDto[];
    tableImage: TableImagesDetailsDto[];

}