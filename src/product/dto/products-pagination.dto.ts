import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { Product } from "../entities/product.entity";
import { Pagination, PaginationArgs, PaginationSortBy, SortDirection } from "../pagination/dto/pagination.dto";


@InputType()
export class ProductsPaginaionSortBy extends PaginationSortBy {
    @Field(() => SortDirection, {nullable: true})
    title?: SortDirection
}


@ArgsType()
export class ProductsPaginationArgs extends PaginationArgs {
    @Field(() => ProductsPaginaionSortBy, {nullable: true})
    sortBy?: ProductsPaginaionSortBy
}


@ObjectType()
export class ProductsPagination extends Pagination {
    @Field(() => [Product])
    nodes: Product[]
}