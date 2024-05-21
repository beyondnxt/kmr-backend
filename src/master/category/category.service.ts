import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { Repository } from 'typeorm';
import { CreatecategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly CategoryRepository: Repository<Category>
    ) { }

    async create(categoryData: CreatecategoryDto, userId: number): Promise<Category> {
        const Category = this.CategoryRepository.create(categoryData);
        Category.createdBy = userId
        return await this.CategoryRepository.save(Category);
    }

    async findAll(page: number = 1, limit: number = 10): Promise<{ data: Category[], totalCount: number }> {
        const [data, totalCount] = await this.CategoryRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });
        return { data, totalCount };
    }

    async findOne(id: number): Promise<Category> {
        const Category = await this.CategoryRepository.findOne({ where: { id } });
        if (!Category) {
            throw new NotFoundException('Category not found');
        }
        return Category;
    }

    async update(id: number, categoryData: CreatecategoryDto, userId): Promise<Category> {
        try {
            const Category = await this.CategoryRepository.findOne({ where: { id } });
            if (!Category) {
                throw new NotFoundException(`Category with ID ${id} not found`);
            }
            Category.updatedBy = userId
            Object.assign(Category, categoryData);
            return await this.CategoryRepository.save(Category);
        } catch (error) {
            throw new Error(`Unable to update Category : ${error.message}`);
        }
    }

    async remove(id: number): Promise<any> {
        const existingCategory = await this.CategoryRepository.findOne({ where: { id } });
        if (!existingCategory) {
            throw new NotFoundException('Category not found');
        }
        await this.CategoryRepository.remove(existingCategory);
        return { message: `Successfully deleted id ${id}` }
    }
}
