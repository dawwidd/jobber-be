import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { User } from './user.model';
import { Skill } from 'src/skill/skill.model';
import { SetThresholdDto } from './dto/set-threshold.dto';
import { ObjectId } from 'mongoose';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post(':userId/skill')
  @UseGuards(JwtAuthGuard)
  async setSkills(
    @Param() userId: ObjectId,
    @Body() skills: Skill[],
  ): Promise<User> {
    return this.userService.setSkills(skills, userId);
  }

  @Post(':userId/threshold')
  @UseGuards(JwtAuthGuard)
  async setActiveApplicationThreshold(
    @Param() userId: ObjectId,
    @Body() setThresholdDto: SetThresholdDto,
  ) {
    return this.userService.setActiveApplicationThreshold(
      setThresholdDto,
      userId,
    );
  }
}
