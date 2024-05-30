import { Module } from '@nestjs/common';
import { ParentCategoryService } from './parent-category.service';
import { ParentCategoryController } from './parent-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParentCategory } from './entity/parent-category.entity';
import { User } from 'src/admin/user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParentCategory, User])],
  providers: [ParentCategoryService],
  controllers: [ParentCategoryController]
})
export class ParentCategoryModule {}
