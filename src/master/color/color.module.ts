import { Module } from '@nestjs/common';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from './entity/color.entiry';

@Module({
  imports: [TypeOrmModule.forFeature([Color])],
  providers: [ColorService],
  controllers: [ColorController]
})
export class ColorModule { }
