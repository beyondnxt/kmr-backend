import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RopeKgLength } from './entity/rope-kg-length.entity';
import { RopeKgLengthController } from './rope-kg-length.controller';
import { RopeKgLengthService } from './rope-kg-length.service';

@Module({
  imports: [TypeOrmModule.forFeature([RopeKgLength])],
  providers: [RopeKgLengthService],
  controllers: [RopeKgLengthController]
})
export class RopeKgLenghtModule { }
