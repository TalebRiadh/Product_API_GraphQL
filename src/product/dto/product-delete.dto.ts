import {  Field, ID, ObjectType } from "@nestjs/graphql";
import { Product } from "../entities/product.entity";
import {  ProductCreateOutput } from "./product-create.dto";




@ObjectType()
export class ProductDeleteOutuput {
    @Field(() => ID)
    productId: Product['id']
}