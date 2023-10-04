import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApplicationCreateDto } from './application.model';
import { ApplicationService } from './application.service';
import { ReqUser } from 'src/user/user.decorator';
import { User } from 'src/user/user.model';

@Controller('application')
export class ApplicationController {

  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  addApplication(@Body() applicationCreateDto: ApplicationCreateDto, @ReqUser() user: User) {
    return this.applicationService.addApplication();
  }

}
