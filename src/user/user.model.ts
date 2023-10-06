import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  refreshToken: String,
  activeApplications: Number
});

export interface User {
  id: mongoose.ObjectId;
  email: string;
  password: string;
  refreshToken: string;
  activeApplications: number;
}

export interface CreateUserDto {
  email: string;
  password: string;
}

export interface UserLoginDto {
  email: string;
  password: string;
}