import { Module } from '@nestjs/common';
import { ChildCategoryService } from './child-category.service';
import { ChildCategoryController } from './child-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChildCategory } from './entity/child-category.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ChildCategory])],
  providers: [ChildCategoryService],
  controllers: [ChildCategoryController]
})
export class ChildCategoryModule {}
