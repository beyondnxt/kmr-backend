import { Module } from '@nestjs/common';
import { ParentCategoryService } from './parent-category.service';
import { ParentCategoryController } from './parent-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParentCategory } from './entity/parent-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParentCategory])],
  providers: [ParentCategoryService],
  controllers: [ParentCategoryController]
})
export class ParentCategoryModule {}
