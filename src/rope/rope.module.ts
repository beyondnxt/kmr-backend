import { Module } from '@nestjs/common';
import { RopeService } from './rope.service';
import { RopeController } from './rope.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rope } from './entity/rope.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rope])],
  providers: [RopeService],
  controllers: [RopeController]
})
export class RopeModule {}
