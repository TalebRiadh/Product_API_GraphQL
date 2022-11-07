import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Product } from "../entities/product.entity";


@InputType()
export class ProductCreateInput {

    @Field(() => String)
    title: string

    @Field(() => String)
    description: string

    @Field(() => Number)
    price: number

    @Field(() => Boolean)
    available: boolean
}

@ObjectType()
export class ProductCreateOutput {
    @Field(() => Product)
    product: Product
}