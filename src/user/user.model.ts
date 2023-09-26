import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: String,
  password: String
});

export interface User {
  email: string;
  password: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
}

export interface UserLoginDto {
  email: string;
  password: string;
}