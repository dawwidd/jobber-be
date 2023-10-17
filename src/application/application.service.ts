import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import {
  Application,
  ApplicationStatusDto,
  ModifyApplicationDto,
} from './application.model';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel('application')
    private readonly applicationModel: Model<Application>,
  ) {}

  async addApplication(createApplicationDto: Application, userId: ObjectId) {
    const applicationData: Application = { ...createApplicationDto, userId };

    const application = new this.applicationModel(applicationData);

    return application.save();
  }

  async findAllForUser(userId: ObjectId): Promise<Application[]> {
    const applications = await this.applicationModel.find({
      userId: userId,
    });

    return applications;
  }

  async findOne(
    applicationId: ObjectId,
    userId: ObjectId,
  ): Promise<Application> {
    const application = await this.applicationModel.findOne({
      _id: applicationId,
      userId: userId,
    });
    return application;
  }

  async changeStatus(
    applicationId: ObjectId,
    applicationStatusDto: ApplicationStatusDto,
    userId: ObjectId,
  ): Promise<Application> {
    const application = await this.applicationModel.findOneAndUpdate(
      {
        _id: applicationId,
        userId: userId,
      },
      { $set: { status: applicationStatusDto.status } },
      { new: true },
    );

    if (!application) {
      throw new NotFoundException(
        'Application not found or you are not permitted to modify it',
      );
    }

    return application;
  }

  async modify(
    modifyApplicationDto: ModifyApplicationDto,
    applicationId: ObjectId,
    userId: ObjectId,
  ): Promise<Application> {
    const application = await this.applicationModel.findOneAndUpdate(
      {
        _id: applicationId,
        userId: userId,
      },
      { $set: modifyApplicationDto },
      { new: true },
    );

    if (!application) {
      throw new NotFoundException(
        'Application not found or you are not permitted to modify it',
      );
    }

    return application;
  }
}
