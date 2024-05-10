import { Module } from '@nestjs/common';
import { RopeKgLenghtService } from './rope-kg-lenght.service';
import { RopeKgLenghtController } from './rope-kg-lenght.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RopeKgLenght } from './entity/rope-kg-length.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RopeKgLenght])],
  providers: [RopeKgLenghtService],
  controllers: [RopeKgLenghtController]
})
export class RopeKgLenghtModule { }
