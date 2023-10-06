import * as mongoose from 'mongoose';
import { Skill } from 'src/skill/skill.model';

export const ApplicationSchema = new mongoose.Schema({
  applicationDate: Date,
  latestContactDate: Date,
  salary: [mongoose.Schema.Types.Mixed],
});

export interface Salary {
  min: number;
  max: number;
}

export interface ApplicationCreateDto {
  applicationDate: Date;
  latestContactDate: Date;
  salary: { min: number; max: number } | number;
  skills: Skill[];
}
