import { Module } from '@nestjs/common';
import { RopeSpecificationService } from './rope-specification.service';
import { RopeSpecificationController } from './rope-specification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RopeSpecification } from './entity/rope-specification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RopeSpecification])],
  providers: [RopeSpecificationService],
  controllers: [RopeSpecificationController]
})
export class RopeSpecificationModule { }
