import { Injectable } from '@nestjs/common';
import { Skill } from './skill.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class SkillService {
  constructor(
    @InjectModel('skill') private readonly skillModel: Model<Skill>,
  ) {}

  async create(createSkillDto: Skill) {
    const skill = new this.skillModel(createSkillDto);

    return skill.save();
  }

  async findAvailableToUser(userId: ObjectId) {
    const skills = this.skillModel.find({
      createdBy: { $in: [userId, null] },
    });

    return skills;
  }
}
