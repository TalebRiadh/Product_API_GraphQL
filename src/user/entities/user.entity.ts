import { Field, ObjectType } from "@nestjs/graphql";
import { Node } from "src/product/pagination/entities/node.entities";
import { Entity, Column } from "typeorm";


@Entity()
@ObjectType()
export class User extends Node {

    @Field(() => String)
    @Column({unique: true})
    email: string
    
    @Field(() => String)
    @Column()
    username: string

    @Field(() => String)
    @Column()
    password: string



}