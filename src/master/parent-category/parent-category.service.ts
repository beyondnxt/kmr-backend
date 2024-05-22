import { Injectable, NotFoundException } from '@nestjs/common';
import { ParentCategory } from './entity/parent-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
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

    async findAll(page: number | 'all' = 1, limit: number = 10, name: string): Promise<{ data: any[], fetchedCount: number, totalCount: number }> {
        const where: any = {};

        if (name) {
            where.name = Like(`%${name}%`);
        }

        let queryBuilder = this.parentCategoryRepository.createQueryBuilder('parentCategory')
            .where('parentCategory.deleted = :deleted', { deleted: false })
            .andWhere(where);

        if (page !== "all") {
            const skip = (page - 1) * limit;
            queryBuilder = queryBuilder.skip(skip).take(limit);
        }

        const [parentCategory, totalCount] = await Promise.all([
            queryBuilder.getMany(),
            queryBuilder.getCount()
        ]);
        return {
            data: parentCategory.map(parentCategory => ({
                id: parentCategory.id,
                name: parentCategory.name,
                deleted: parentCategory.deleted,
                createdBy: parentCategory.createdBy,
                createdon: parentCategory.createdOn,
                updatedBy: parentCategory.updatedBy,
                updatedOn: parentCategory.updatedOn
            })),
            fetchedCount: parentCategory.length,
            totalCount: totalCount
        };
    }

    async findOne(id: number): Promise<ParentCategory> {
        const parentCategory = await this.parentCategoryRepository.findOne({ where: { id, deleted: false } });
        if (!parentCategory) {
            throw new NotFoundException('ParentCategory not found');
        }
        return parentCategory;
    }

    async update(id: number, parentCategoryData: CreateParentCategoryDto, userId): Promise<ParentCategory> {
        try {
            const parentCategory = await this.parentCategoryRepository.findOne({ where: { id, deleted: false } });
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
        const existingParentCategory = await this.parentCategoryRepository.findOne({ where: { id, deleted: false } });
        if (!existingParentCategory) {
            throw new NotFoundException('Parent category not found');
        }
        existingParentCategory.deleted = true
        await this.parentCategoryRepository.save(existingParentCategory);
        return { message: `Successfully deleted id ${id}` }
    }
}
