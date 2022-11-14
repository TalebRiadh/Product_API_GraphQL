import { Args, ID, Mutation, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { ProductCreateInput, ProductCreateOutput } from "../dto/product-create.dto";
import { ProductDeleteOutuput } from "../dto/product-delete.dto";
import { ProductUpdateInput, ProductUpdateOutput } from "../dto/product-update.dto";
import { Product } from "../entities/product.entity";
import { ProductService } from "../product.service";
import { UseGuards } from '@nestjs/common';

@Resolver(Product)
export class ProductMutationsResolver {
    constructor(private readonly  productService: ProductService){}

    @UseGuards(JwtAuthGuard)
    @Mutation(() => ProductCreateOutput)
    async productCreate(
        @Args('input') 
        input: ProductCreateInput){
        return this.productService.productCreate(input);
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