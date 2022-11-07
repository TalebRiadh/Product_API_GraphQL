import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";


@ObjectType()
export class UserCreateOutput {
    @Field(() => User)
    user: User
}


@InputType()
export class UserCreateInput{
    
    @Field(() => String)
    email: string
    
    @Field(() => String)
    username: string

    @Field(() => String)
    password: string

}