import { Injectable, NotFoundException } from '@nestjs/common';
import { ModifySKillDto, Skill } from './skill.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class SkillService {
  constructor(
    @InjectModel('skill') private readonly skillModel: Model<Skill>,
  ) {}

  async create(createSkillDto: Skill): Promise<Skill> {
    const skill = new this.skillModel(createSkillDto);

    return skill.save();
  }

  async findAllAvailableToUser(userId: ObjectId): Promise<Skill[]> {
    const skills = await this.skillModel.find({
      createdBy: { $in: [userId, null] },
    });

    return skills;
  }

  async findOne(skillId: ObjectId, userId: ObjectId) {
    const skill = await this.skillModel.find({
      _id: skillId,
      createdBy: { $in: [userId, null] },
    });

    return skill;
  }

  async modify(
    modifySkillDto: ModifySKillDto,
    skillId: ObjectId,
    userId: ObjectId,
  ): Promise<Skill> {
    const skill = await this.skillModel.findOneAndUpdate(
      {
        _id: skillId,
        createdBy: userId,
      },
      {
        $set: modifySkillDto,
      },
      {
        new: true,
      },
    );

    if (!skill) {
      throw new NotFoundException(
        'Skill not found ro you are not permitted to modify it',
      );
    }

    return skill;
  }
}
