import {ApiProperty} from "@nestjs/swagger";

export class SingleFileToBudgetDto {
    @ApiProperty({type: "string", format: "binary"})
    photo_url: string
    @ApiProperty({type: "number"})
    budgetId: number
}