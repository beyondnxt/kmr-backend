import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChildCategory } from './entity/child-category.entity';
import { Like, Repository } from 'typeorm';
import { CreateChildCategoryDto } from './dto/child-category.dto';

@Injectable()
export class ChildCategoryService {
    constructor(
        @InjectRepository(ChildCategory)
        private readonly childCategoryRepository: Repository<ChildCategory>
    ) { }

    async create(childCategoryData: CreateChildCategoryDto, userId: number): Promise<ChildCategory> {
        const childCategory = this.childCategoryRepository.create(childCategoryData);
        childCategory.createdBy = userId
        return await this.childCategoryRepository.save(childCategory);
    }

    async findAll(page: number | "all" = 1, limit: number = 10, name: string): Promise<{ data: ChildCategory[], fetchedCount: number, totalCount: number }> {
        const where: any = {};
        if (name) {
            where.name = Like(`%${name}%`);
        }
        let queryBuilder = this.childCategoryRepository.createQueryBuilder('child-category')
            .andWhere(where);

        if (page !== "all") {
            const skip = (page - 1) * limit;
            queryBuilder = queryBuilder.skip(skip).take(limit);
        }

        const [childCategory, totalCount] = await Promise.all([
            queryBuilder.getMany(),
            queryBuilder.getCount()
        ]);
        return {
            data: childCategory,
            fetchedCount: childCategory.length,
            totalCount: totalCount
        };
    }

    async findOne(id: number): Promise<ChildCategory> {
        const childCategory = await this.childCategoryRepository.findOne({ where: { id } });
        if (!childCategory) {
            throw new NotFoundException('ChildCategory not found');
        }
        return childCategory;
    }

    async update(id: number, childCategoryData: CreateChildCategoryDto, userId): Promise<ChildCategory> {
        try {
            const childCategory = await this.childCategoryRepository.findOne({ where: { id } });
            if (!childCategory) {
                throw new NotFoundException(`ChildCategory with ID ${id} not found`);
            }
            childCategory.updatedBy = userId
            Object.assign(childCategory, childCategoryData);
            return await this.childCategoryRepository.save(childCategory);
        } catch (error) {
            throw new Error(`Unable to update ChildCategory : ${error.message}`);
        }
    }

    async remove(id: number): Promise<any> {
        const existingChildCategory = await this.childCategoryRepository.findOne({ where: { id } });
        if (!existingChildCategory) {
            throw new NotFoundException('ChildCategory not found');
        }
        await this.childCategoryRepository.remove(existingChildCategory);
        return { message: `Successfully deleted id ${id}` }
    }
}
