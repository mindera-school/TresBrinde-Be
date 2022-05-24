import {DomainBuilder} from "ts-generic-builder";

interface BudgetProductDetailsDtoProps {
    id: number;
    quantity: number;
    productId: number;
}

export class BudgetProductDetailsDto implements BudgetProductDetailsDtoProps {
    constructor(builder: DomainBuilder<BudgetProductDetailsDtoProps, BudgetProductDetailsDto> & BudgetProductDetailsDtoProps) {
        this.id = builder.id;
        this.quantity = builder.quantity
        this.productId = builder.productId
    }

    id: number;
    quantity: number;
    productId: number;

}