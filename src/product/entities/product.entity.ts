import { ObjectType, Field } from "@nestjs/graphql"
import {Entity,  Column} from "typeorm"
import { Node } from "../pagination/entities/node.entities"


@Entity()
@ObjectType()
export class Product extends Node{

    @Field(() => String)
    @Column()
    title: string

    @Field(() => String)
    @Column()
    description: string

    @Field(() => Number)
    @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2, default: 0.0 })
    price: number

    @Field(() => Boolean)
    @Column()
    available: boolean

 
}