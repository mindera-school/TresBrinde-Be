import {DomainBuilder} from "ts-generic-builder";

interface priceQuantityDetailsDtoProps {
    id: number;
    quantity: number;
    unitPrice: number;
}

export class PriceQuantityDetailsDto implements priceQuantityDetailsDtoProps {

    constructor(builder: DomainBuilder<priceQuantityDetailsDtoProps, PriceQuantityDetailsDto> & priceQuantityDetailsDtoProps) {
        this.id = builder.id;
        this.quantity = builder.quantity;
        this.unitPrice = builder.unitPrice
    }

    id: number;
    quantity: number;
    unitPrice: number;
}