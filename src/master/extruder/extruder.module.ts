import { Module } from '@nestjs/common';
import { ExtruderService } from './extruder.service';
import { ExtruderController } from './extruder.controller';

@Module({
  providers: [ExtruderService],
  controllers: [ExtruderController]
})
export class ExtruderModule {}
