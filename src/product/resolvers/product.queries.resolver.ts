import { Args, Query, Resolver } from "@nestjs/graphql";
import { ProductsPagination, ProductsPaginationArgs } from "../dto/products-pagination.dto";
import { Product } from "../entities/product.entity";
import { ProductService } from "../product.service";


@Resolver(Product)
export class ProductQueriesResolver{
    constructor(
        private readonly productService: ProductService){}
    @Query(() => ProductsPagination)
    async ProductsPagination(@Args() args: ProductsPaginationArgs) {
        return this.productService.productsPagination(args)
    }
}