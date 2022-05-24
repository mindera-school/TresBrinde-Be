import {ApiProperty} from "@nestjs/swagger";

export class SingleFileToCategoryDto {
    @ApiProperty({type: "string", format: "binary"})
    photo_url: string
    @ApiProperty({type: "number"})
    categoryId: number
}