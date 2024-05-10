import { Module } from '@nestjs/common';
import { RopeGradeService } from './rope-grade.service';
import { RopeGradeController } from './rope-grade.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RopeGrade } from './entity/rope-grade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RopeGrade])],
  providers: [RopeGradeService],
  controllers: [RopeGradeController]
})
export class RopeGradeModule { }
