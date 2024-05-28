import { Module } from '@nestjs/common';
import { ExtruderService } from './extruder.service';
import { ExtruderController } from './extruder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Extruder } from './entity/extruder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Extruder])],
  providers: [ExtruderService],
  controllers: [ExtruderController]
})
export class ExtruderModule { }
