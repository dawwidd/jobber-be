import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Skill } from './skill.model';
import { SkillService } from './skill.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ReqUser } from 'src/user/user.decorator';
import { User } from 'src/user/user.model';

@Controller('skill')
export class SkillController {
  constructor(private skillService: SkillService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@ReqUser() user: User, @Body() skill: Skill) {
    skill.createdBy = user.id;
    return this.skillService.create(skill);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAvailableToUser(@ReqUser() user: User) {
    const skills = this.skillService.findAvailableToUser(user.id);
    return skills;
  }
}
