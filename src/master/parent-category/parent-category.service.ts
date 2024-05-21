import { Injectable, NotFoundException } from '@nestjs/common';
import { ParentCategory } from './entity/parent-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParentCategoryDto } from './dto/parent-category.dto';

@Injectable()
export class ParentCategoryService {
    constructor(
        @InjectRepository(ParentCategory)
        private readonly parentCategoryRepository: Repository<ParentCategory>
    ) { }

    async create(parentCategoryData: CreateParentCategoryDto, userId: number): Promise<ParentCategory> {
        const parentCategory = this.parentCategoryRepository.create(parentCategoryData);
        parentCategory.createdBy = userId
        return await this.parentCategoryRepository.save(parentCategory);
    }

    async findAll(page: number = 1, limit: number = 10): Promise<{ data: ParentCategory[], totalCount: number }> {
        const [data, totalCount] = await this.parentCategoryRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });
        return { data, totalCount };
    }

    async findOne(id: number): Promise<ParentCategory> {
        const parentCategory = await this.parentCategoryRepository.findOne({ where: { id } });
        if (!parentCategory) {
            throw new NotFoundException('ParentCategory not found');
        }
        return parentCategory;
    }

    async update(id: number, parentCategoryData: CreateParentCategoryDto, userId): Promise<ParentCategory> {
        try {
            const parentCategory = await this.parentCategoryRepository.findOne({ where: { id } });
            if (!parentCategory) {
                throw new NotFoundException(`ParentCategory with ID ${id} not found`);
            }
            parentCategory.updatedBy = userId
            Object.assign(parentCategory, parentCategoryData);
            return await this.parentCategoryRepository.save(parentCategory);
        } catch (error) {
            throw new Error(`Unable to update ParentCategory : ${error.message}`);
        }
    }

    async remove(id: number): Promise<any> {
        const existingParentCategory = await this.parentCategoryRepository.findOne({ where: { id } });
        if (!existingParentCategory) {
            throw new NotFoundException('ParentCategory not found');
        }
        await this.parentCategoryRepository.remove(existingParentCategory);
        return { message: `Successfully deleted id ${id}` }
    }
}
