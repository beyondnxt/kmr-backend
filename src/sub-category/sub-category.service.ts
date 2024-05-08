import { Injectable, NotFoundException } from '@nestjs/common';
import { SubCategory } from './entity/sub-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateSubCategoryDto } from './dto/sub-category.dto';

@Injectable()
export class SubCategoryService {
    constructor(
        @InjectRepository(SubCategory)
        private readonly subCategoryRepository: Repository<SubCategory>
    ) { }

    async create(subCategoryData: CreateSubCategoryDto, userId: number): Promise<SubCategory> {
        const subCategory = this.subCategoryRepository.create(subCategoryData);
        subCategory.createdBy = userId
        return await this.subCategoryRepository.save(subCategory);
    }

    async findAll(page: number | "all" = 1, limit: number = 10, name: string): Promise<{ data: SubCategory[], fetchedCount: number, totalCount: number }> {
        const where: any = {};
        if (name) {
            where.name = Like(`%${name}%`);
        }
        let queryBuilder = this.subCategoryRepository.createQueryBuilder('sub_category')
            .andWhere(where);

        if (page !== "all") {
            const skip = (page - 1) * limit;
            queryBuilder = queryBuilder.skip(skip).take(limit);
        }

        const [subCategory, totalCount] = await Promise.all([
            queryBuilder.getMany(),
            queryBuilder.getCount()
        ]);
        return {
            data: subCategory,
            fetchedCount: subCategory.length,
            totalCount: totalCount
        };
    }

    async findOne(id: number): Promise<SubCategory> {
        const subCategory = await this.subCategoryRepository.findOne({ where: { id } });
        if (!subCategory) {
            throw new NotFoundException(`SubCategory id ${id} not found`);
        }
        return subCategory;
    }

    async update(id: number, subCategoryData: CreateSubCategoryDto, userId): Promise<SubCategory> {
        try {
            const subCategory = await this.subCategoryRepository.findOne({ where: { id } });
            if (!subCategory) {
                throw new NotFoundException(`SubCategory with ID ${id} not found`);
            }
            subCategory.updatedBy = userId
            Object.assign(subCategory, subCategoryData);
            return await this.subCategoryRepository.save(subCategory);
        } catch (error) {
            throw new Error(`Unable to update SubCategory : ${error.message}`);
        }
    }

    async remove(id: number): Promise<any> {
        const existingSubCategory = await this.subCategoryRepository.findOne({ where: { id } });
        if (!existingSubCategory) {
            throw new NotFoundException('SubCategory not found');
        }
        await this.subCategoryRepository.remove(existingSubCategory);
        return { message: `Successfully deleted id ${id}` }
    }
}
