import * as mongoose from 'mongoose';
import { Skill, SkillSchema } from 'src/skill/skill.model';

export const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  refreshToken: String,
  activeApplicationsThreshold: Number,
  skills: [SkillSchema],
});

export interface User {
  id: mongoose.ObjectId;
  email: string;
  password: string;
  refreshToken: string;
  activeApplicationsThreshold: number;
  skills: Skill[];
}

export interface CreateUserDto {
  email: string;
  password: string;
}

export interface UserLoginDto {
  email: string;
  password: string;
}
