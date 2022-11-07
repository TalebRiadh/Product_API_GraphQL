import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm'
import { UserCreateInput, UserCreateOutput } from './dto/user-create.dto';
import * as bcrypt from 'bcrypt';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';

enum PostgresErrorCode {
    UniqueViolation = '23505'
  }

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>){}

    async userGet(email: User['email']): Promise<User> {
            return this.userRepository.findOneByOrFail({email:email})
        }

    async userCreate(input: UserCreateInput): Promise<UserCreateOutput> {
        const hashedPassword = await bcrypt.hash(input.password, 10);
    try {
        const newUser = this.userRepository.create({
        ...input,
        password: hashedPassword
      });
        const user = await this.userRepository.save(newUser)
        return  { user } ;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }
}
