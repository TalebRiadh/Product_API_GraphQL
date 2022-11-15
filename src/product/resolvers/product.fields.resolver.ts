import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import { Product } from "../entities/product.entity";
import { ProductService } from "../product.service";




@Resolver(Product)
export class ProductFieldsResolver {
    constructor(
        private userService: UserService,
        private productService: ProductService
    ) {}

    @ResolveField(() => User, {nullable : true})
    async creator(@Parent() product: Product){
        if(!product.creatorId){
            return null
        }
        try{
            return await this.userService.userGetById(product.creatorId)
        }catch(e){
            return null
        }
    }
}