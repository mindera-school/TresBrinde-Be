export class SearchProductPropsDto {
    constructor(category: number, subCategory: number, search: string) {
        this.category = category
        this.subCategory = subCategory
        this.search = search
    }

    category: number;
    subCategory: number;
    search: string
}