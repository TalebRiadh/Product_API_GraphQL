import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { ProductMutationsResolver } from './resolvers/product.mutations.resolver';
import { ProductQueriesResolver } from './resolvers/product.queries.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductService, ProductMutationsResolver, ProductQueriesResolver]
})
export class ProductModule {}
