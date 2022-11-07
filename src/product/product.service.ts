import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm'
import { ProductCreateInput, ProductCreateOutput } from './dto/product-create.dto';
import { ProductUpdateInput, ProductUpdateOutput } from './dto/product-update.dto';
import { ProductDeleteOutuput } from './dto/product-delete.dto';
import { ProductsPagination, ProductsPaginationArgs } from './dto/products-pagination.dto';
import { SortDirection } from './pagination/dto/pagination.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ){}


    async productCreate(input: ProductCreateInput): Promise<ProductCreateOutput> {

        const newProduct = this.productRepository.create(input)
        const product = await this.productRepository.save(newProduct)
        return { product }
    }

    async productUpdate(
        productId: Product['id'],
        input: ProductUpdateInput,
    )   : Promise<ProductUpdateOutput> {
        const product = await this.productRepository.findOneByOrFail({id: productId})
        product.title = input.title
        product.description = input.description
        product.price = input.price
        product.available = input.available
        await product.save();
        return {product}
    }

    async productDelete(
        productId: Product['id']
    ): Promise<ProductDeleteOutuput>{
        const product = await this.productRepository.findOneByOrFail({id: productId})
        await product.remove()
        return {productId}
    }

    async productsPagination(args: ProductsPaginationArgs): Promise<ProductsPagination> {
        const qb = this.productRepository.createQueryBuilder('product')
        qb.take(args.take)
        qb.skip(args.skip)
        if(args.sortBy){
            if(args.sortBy.created_at !== null){
                qb.addOrderBy(
                    'product.created_at',
                    args.sortBy.created_at === SortDirection.ASC ? "ASC" : "DESC"
                )
            }
            if(args.sortBy.title !== null){
                qb.addOrderBy(
                    'product.title',
                    args.sortBy.title === SortDirection.ASC ? "ASC" : "DESC"
                )
            }
        }
        const [nodes, totalCount] = await qb.getManyAndCount()
        return { nodes, totalCount }
    }
}
