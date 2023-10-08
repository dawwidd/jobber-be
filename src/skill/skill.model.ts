import mongoose, { ObjectId } from 'mongoose';

export const SkillSchema = new mongoose.Schema({
  name: String,
  color: String,
  createdBy: mongoose.Types.ObjectId,
  experienceInYrs: Number,
});

export interface Skill {
  name: string;
  color: string;
  createdBy: ObjectId | null;
  experienceInYrs: number | null;
}
