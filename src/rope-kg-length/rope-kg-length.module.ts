import { Module } from '@nestjs/common';
import { RopeKgLengthService } from './rope-kg-lenght.service';
import { RopeKgLengthController } from './rope-kg-lenght.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RopeKgLength } from './entity/rope-kg-length.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RopeKgLength])],
  providers: [RopeKgLengthService],
  controllers: [RopeKgLengthController]
})
export class RopeKgLenghtModule { }
