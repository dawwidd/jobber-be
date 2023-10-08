import { MongooseModule } from '@nestjs/mongoose';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';
import { Module } from '@nestjs/common';
import { SkillSchema } from './skill.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'skill', schema: SkillSchema }]),
  ],
  controllers: [SkillController],
  providers: [SkillService],
  exports: [SkillService],
})
export class SkillModule {}
