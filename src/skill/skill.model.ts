import mongoose, { ObjectId } from 'mongoose';
import { User } from 'src/user/user.model';

export const SkillSchema = new mongoose.Schema({
  name: String,
  color: String,
  createdBy: mongoose.Types.ObjectId,
  experienceYrs: Number,
});

export interface Skill {
  name: string;
  color: string;
  createdBy: ObjectId | null;
  experienceYrs: number | null;
}
