import { Args, ID, Mutation, Resolver } from "@nestjs/graphql";
import { CurrentUser, JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import {ProductCreateInput,
        ProductCreateOutput,
        ProductDeleteOutuput, 
        ProductUpdateInput, 
        ProductUpdateOutput} from '../dto'
import { Product } from "../entities/product.entity";
import { ProductService } from "../product.service";
import { UseGuards } from '@nestjs/common';
import { JWTPayload } from "src/auth/auth.service";

@Resolver(Product)
export class ProductMutationsResolver {
    constructor(private readonly  productService: ProductService){}

    @UseGuards(JwtAuthGuard)
    @Mutation(() => ProductCreateOutput)
    async productCreate(
        @CurrentUser()
        user: JWTPayload,
        @Args('input') 
        input: ProductCreateInput){
        return this.productService.productCreate(user, input);
    }

    @Mutation(() => ProductUpdateOutput)
    async productUpdate(
        @Args({name: 'productId', type: () => ID }) productId: Product['id'],
        @Args('input') input: ProductUpdateInput,
    ) {
        return this.productService.productUpdate(productId, input)
    }

    @Mutation(() => ProductDeleteOutuput)
    async productDelete(
        @Args({name: 'productId', type: () => ID }) productId: Product['id'],
    ) {
        return this.productService.productDelete(productId)
    }
    
}