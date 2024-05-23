import { Module } from '@nestjs/common';
import { RopeSpecificationService } from './rope-specification.service';
import { RopeSpecificationController } from './rope-specification.controller';

@Module({
  providers: [RopeSpecificationService],
  controllers: [RopeSpecificationController]
})
export class RopeSpecificationModule {}
