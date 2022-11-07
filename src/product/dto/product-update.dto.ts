import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { ProductCreateInput, ProductCreateOutput } from "./product-create.dto";


@InputType()
export class ProductUpdateInput extends ProductCreateInput {
}

@ObjectType()
export class ProductUpdateOutput extends ProductCreateOutput {
}