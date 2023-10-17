import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationSchema } from './application.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'application', schema: ApplicationSchema },
    ]),
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
