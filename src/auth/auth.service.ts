import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { User } from 'src/user/entities/user.entity';
import { AuthLoginOutput } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';

export interface JWTPayload {
  id: string
  email: string
  username: string

}

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
      private readonly jwtService: JwtService){}
    
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

    async login(user: User): Promise<AuthLoginOutput>{
      const payload: JWTPayload = {
        id: user.id,
        email: user.email,
        username: user.username,
      }
      return {
        accessToken: this.jwtService.sign(payload)
      }
    }

}
