import { ArgsType, Field, InputType, Int, InterfaceType, registerEnumType } from "@nestjs/graphql";
import { Node } from "../entities/node.entities";

export enum SortDirection {
    ASC,
    DESC
}

registerEnumType(SortDirection, {
    name: 'SortDirection'
})

@InputType()
export class PaginationSortBy {
    @Field(() => SortDirection, {nullable: true})
    created_at?: SortDirection
}

@ArgsType()
export class PaginationArgs {
    @Field(() => Int)
    skip: number

    @Field(() => Int)
    take: number
}




@InterfaceType()
export abstract class Pagination<N extends Node = Node> {
    @Field()
    totalCount: number

    @Field(() => [Node])
    abstract nodes: N[]
}