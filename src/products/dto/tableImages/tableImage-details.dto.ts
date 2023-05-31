import { DomainBuilder } from "ts-generic-builder";

interface TableImagesDetailsDtoProps {
  id: number;
  // This part of the code is a temporary measure for front-end problem
  // TODO 1: FrontEnd needs to catch this information direct on product Properties
  propertyId: number;
  //
  image: string;
}

export class TableImagesDetailsDto implements TableImagesDetailsDtoProps {
  constructor(
    builder: DomainBuilder<TableImagesDetailsDtoProps, TableImagesDetailsDto> &
      TableImagesDetailsDtoProps
  ) {
    this.id = builder.id;
    // This part of the code is a temporary measure for front-end problem
    // TODO 1: FrontEnd needs to catch this information direct on product Properties
    this.propertyId = builder.propertyId;
    //
    this.image = builder.image;
  }

  id: number;
  // This part of the code is a temporary measure for front-end problem
  // TODO 1: FrontEnd needs to catch this information direct on product Properties
  propertyId: number;
  //
  image: string;
}
