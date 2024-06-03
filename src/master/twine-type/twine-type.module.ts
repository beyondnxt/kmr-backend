import { Module } from '@nestjs/common';
import { TwineTypeService } from './twine-type.service';
import { TwineTypeController } from './twine-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TwineType } from './entity/twine-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TwineType])],
  providers: [TwineTypeService],
  controllers: [TwineTypeController]
})
export class TwineTypeModule {}
