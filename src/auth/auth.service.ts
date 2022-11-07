import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';


@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){}
    
    async validateUser(email: string, password: string): Promise<any>{
        try{
        const user = await this.userService.userGet(email)
        const isPasswordMatching = await bcrypt.compare(
            password,
            user.password
          );
          if (!isPasswordMatching) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
          }
          user.password = undefined;
          return user;
        } catch (error) {
          throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }


}
