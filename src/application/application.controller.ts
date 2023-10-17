import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import {
  Application,
  ApplicationStatusDto,
  ModifyApplicationDto,
} from './application.model';
import { ApplicationService } from './application.service';
import { ReqUser } from 'src/user/user.decorator';
import { User } from 'src/user/user.model';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@ReqUser() user: User, @Body() application: Application) {
    return this.applicationService.addApplication(application, user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAllForUser(@ReqUser() user: User) {
    return this.applicationService.findAllForUser(user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@ReqUser() user: User, @Param('id') applicationId: ObjectId) {
    return this.applicationService.findOne(applicationId, user.id);
  }

  @Put(':id/status')
  @UseGuards(JwtAuthGuard)
  changeStatus(
    @ReqUser() user: User,
    @Param('id') applicationId: ObjectId,
    @Body() applicationStatusDto: ApplicationStatusDto,
  ) {
    return this.applicationService.changeStatus(
      applicationId,
      applicationStatusDto,
      user.id,
    );
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  modify(
    @ReqUser() user: User,
    @Param('id') applicationId: ObjectId,
    @Body() application: ModifyApplicationDto,
  ) {
    return this.applicationService.modify(application, applicationId, user.id);
  }
}
