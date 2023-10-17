import * as mongoose from 'mongoose';
import { Skill, SkillSchema } from 'src/skill/skill.model';

export const ApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'user' },
  applicationDate: Date,
  latestContactDate: Date,
  salary: mongoose.Schema.Types.Mixed,
  skills: [SkillSchema],
  status: String,
  latestContact: String,
  firstContact: String,
  companyType: String,
  companyName: String,
  extra: String,
});

export interface Salary {
  min: number;
  max: number;
}

export interface Application {
  userId: mongoose.ObjectId;
  applicationDate: Date;
  latestContactDate: Date;
  salary: Salary | number;
  skills: Skill[];
  status: ApplicationStatus;
  latestContact: string;
  firstContact: string;
  companyType: string;
  companyName: string;
  extra: string;
}

export interface ModifyApplicationDto extends Omit<Application, 'userId'> {}

export interface ApplicationStatusDto {
  status: ApplicationStatus;
}

export enum ApplicationStatus {
  'PENDING',
  'HR',
  'FIRST STAGE',
  'SECOND STAGE',
  'CLOSED',
  'INVITED',
  'LANDED',
}
