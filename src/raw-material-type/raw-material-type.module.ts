import { Module } from '@nestjs/common';
import { RawMaterialTypeService } from './raw-material-type.service';
import { RawMaterialTypeController } from './raw-material-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawMaterialType } from './entity/raw-material-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RawMaterialType])],
  providers: [RawMaterialTypeService],
  controllers: [RawMaterialTypeController]
})
export class RawMaterialTypeModule {}
