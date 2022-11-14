import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "../auth.service";
import {LocalAuthGuard} from '../guards/local-auth.guard'
import {UseGuards} from '@nestjs/common'
import { AuthLoginOutput } from "../dto/auth-login.dto";

@Resolver()
export class AuthMutationResolver {
    constructor(private readonly authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @Mutation(() => AuthLoginOutput)
    async authLogin(
        @Context('req') req:  any,
        @Args('username') _username: string,
        @Args('password') _password: string
    ){
        return this.authService.login(req.user)
    }
}