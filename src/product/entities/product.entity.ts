import { ObjectType, Field } from "@nestjs/graphql"
import { User } from "src/user/entities/user.entity"
import {Entity,  Column, JoinColumn, ManyToOne, RelationId} from "typeorm"
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

    @ManyToOne(() => User, (user) => user.products)
    @JoinColumn()
    creator: User

    @RelationId((self: Product) => self.creator)
    readonly creatorId: User['id']
}