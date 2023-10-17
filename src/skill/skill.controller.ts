import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ModifySKillDto, Skill } from './skill.model';
import { SkillService } from './skill.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ReqUser } from 'src/user/user.decorator';
import { User } from 'src/user/user.model';
import { ObjectId } from 'mongoose';

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
  async findAllAvailableToUser(@ReqUser() user: User) {
    return this.skillService.findAllAvailableToUser(user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@ReqUser() user: User, @Param('id') skillId: ObjectId) {
    return this.skillService.findOne(skillId, user.id);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  async modify(
    @ReqUser() user: User,
    @Param('id') skillId: ObjectId,
    @Body() modifySkillDto: ModifySKillDto,
  ) {
    return this.skillService.modify(modifySkillDto, skillId, user.id);
  }
}
