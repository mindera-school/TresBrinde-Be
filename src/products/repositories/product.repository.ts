import {EntityRepository, Repository} from "typeorm";
import {ProductEntity} from "../entities/product.entity";
import {SearchProductPropsDto} from "../dto/products/search-product-props.dto";

@EntityRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {
    getPaginatedProducts(limit: number, page: number, searchProductDto: SearchProductPropsDto) {
        const query = this.createQueryBuilder("PE")
            .leftJoinAndSelect("PE.subCategories", "SCE")
            .leftJoinAndSelect("PE.priceQuantities", "PQ")
            .leftJoinAndSelect("PE.productProperties", "PP")
            .leftJoinAndSelect("PP.property", "P")
            .leftJoinAndSelect("PE.tableImages", "TI")
            .where(
                `(UPPER (PE.keywords) Like UPPER('%${searchProductDto.search}%')`
            )
            .orWhere(
                `UPPER (PE.productName) Like UPPER('%${searchProductDto.search}%'))`
            )
            .andWhere(
                //https://github.com/typeorm/typeorm/issues/3103 cjmyles comment on how to implement ternary on queryBuilder
                searchProductDto.subCategory ?
                    `SCE.id = ${searchProductDto.subCategory}` : `1=1`
            )
            .andWhere(
                searchProductDto.category ?
                    `SCE.mainCategoryId = ${searchProductDto.category}` : `1=1`
            )
            .take(limit)
            .skip(limit * (page - 1));

        return query.getMany()
    }

}