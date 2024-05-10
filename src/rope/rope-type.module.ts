import { Module } from '@nestjs/common';
import { RopeService } from './rope-type.service';
import { RopeController } from './rope-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RopeType } from './entity/rope-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RopeType])],
  providers: [RopeService],
  controllers: [RopeController]
})
export class RopeModule {}
