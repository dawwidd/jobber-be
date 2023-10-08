import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Skill } from './skill.model';
import { SkillService } from './skill.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import RequestWithUser from 'src/auth/request-with-user.interface';

@Controller('skill')
export class SkillController {
  constructor(private skillService: SkillService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Req() request: RequestWithUser, @Body() skill: Skill) {
    skill.createdBy = request.user.id;
    return this.skillService.create(skill);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAvailableToUser(@Req() request: RequestWithUser) {
    const skills = this.skillService.findAvailableToUser(request.user.id);
    return skills;
  }
}
