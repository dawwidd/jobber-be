import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { User } from './user.model';
import { Skill } from 'src/skill/skill.model';
import { ReqUser } from './user.decorator';
import { SetThresholdDto } from './dto/set-threshold.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('skill')
  @UseGuards(JwtAuthGuard)
  async setSkills(
    @ReqUser() user: User,
    @Body() skills: Skill[],
  ): Promise<User> {
    return this.userService.setSkills(skills, user.id);
  }

  @Post('threshold')
  @UseGuards(JwtAuthGuard)
  async setActiveApplicationThreshold(
    @ReqUser() user: User,
    @Body() setThresholdDto: SetThresholdDto,
  ) {
    return this.userService.setActiveApplicationThreshold(
      setThresholdDto,
      user.id,
    );
  }
}
