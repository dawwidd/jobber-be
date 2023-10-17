import mongoose, { ObjectId } from 'mongoose';

export const SkillSchema = new mongoose.Schema({
  name: String,
  color: String,
  createdBy: { type: mongoose.Types.ObjectId, ref: 'user' },
  experienceInYrs: Number,
});

export interface Skill {
  name: string;
  color: string;
  createdBy: ObjectId | null;
  experienceInYrs: number | null;
}

export interface ModifySKillDto extends Omit<Skill, 'createdBy'> {}
