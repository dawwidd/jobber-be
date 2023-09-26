import { Body, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, User } from './user.model';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}

  getUsers() {
    return this.userModel.find();
  }

  async createUser(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = new this.userModel({ ...createUserDto, password: hashedPassword });

    const result = await newUser.save();
    return result.id;
  }

  async validateUser(loggingUser: User) {
    const user: User = await this.userModel.findOne({
        email: loggingUser.email,
    });

    if (!user) {
        throw new ForbiddenException('Invaild username or password');
    }

    const passwordMatch = await bcrypt.compare(
        loggingUser.password,
        user.password,
    );

    if (!passwordMatch) {
        throw new ForbiddenException('Invalid username or password');
    }

    return true;
  }

  async findUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email });

    return user;
  }
}
