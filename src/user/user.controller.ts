import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import RequestWithUser from 'src/auth/request-with-user.interface';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { User } from './user.model';
import { Skill } from 'src/skill/skill.model';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('skill')
  @UseGuards(JwtAuthGuard)
  async setSkills(
    @Req() request: RequestWithUser,
    @Body() skills: Skill[],
  ): Promise<User> {
    return this.userService.setSkills(skills, request.user.id);
  }
}
