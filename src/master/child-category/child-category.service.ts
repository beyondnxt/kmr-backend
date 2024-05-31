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

    async findAll(page: number | "all" = 1, limit: number = 10, name: string): Promise<{ data: any[], fetchedCount: number, totalCount: number }> {
        const where: any = {};
        if (name) {
            where.name = Like(`%${name}%`);
        }
        let queryBuilder = this.childCategoryRepository.createQueryBuilder('childCategory')
            .where('childCategory.deleted = :deleted', { deleted: false })
            .leftJoinAndSelect('childCategory.parentCategory', 'parentCategory', 'parentCategory.deleted = :deleted', { deleted: false })
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
            data: childCategory.map(childCategory => ({
                id: childCategory.id,
                parentCategoryId: childCategory.parentCategoryId,
                parentCategoryName: childCategory.parentCategory.name,
                name: childCategory.name,
                deleted: childCategory.deleted,
                createdBy: childCategory.createdBy,
                createdOn: childCategory.createdOn,
                updatedBy: childCategory.updatedBy,
                updatedOn: childCategory.updatedOn
            })),
            fetchedCount: childCategory.length,
            totalCount: totalCount
        };
    }

    async getChildName(): Promise<{ data: any[] }> {
        const childCategory = await this.childCategoryRepository.createQueryBuilder('childCategory')
            .leftJoinAndSelect('childCategory.parentCategory', 'parentCategory', 'parentCategory.deleted = :deleted', { deleted: false })
            .where('childCategory.deleted = :deleted', { deleted: false })
            .getMany();

        return {
            data: childCategory.map(childCategory => {
                const parentCategoryName = childCategory.parentCategory ? childCategory.parentCategory.name : '';
                const childCategoryName = childCategory ? childCategory.name : '';
                const categoryPath = `${parentCategoryName}/${childCategoryName}`;

                return {
                    id: childCategory.id,
                    childCategoryName: categoryPath,
                };
            }),
        };
    }

    async findOne(id: number): Promise<ChildCategory> {
        const childCategory = await this.childCategoryRepository.findOne({ where: { id, deleted: false } });
        if (!childCategory) {
            throw new NotFoundException('ChildCategory not found');
        }
        return childCategory;
    }

    async update(id: number, childCategoryData: CreateChildCategoryDto, userId): Promise<ChildCategory> {
        try {
            const childCategory = await this.childCategoryRepository.findOne({ where: { id, deleted: false } });
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
        const existingChildCategory = await this.childCategoryRepository.findOne({ where: { id, deleted: false } });
        if (!existingChildCategory) {
            throw new NotFoundException('Parent category not found');
        }
        existingChildCategory.deleted = true
        await this.childCategoryRepository.save(existingChildCategory);
        return { message: `Successfully deleted id ${id}` }
    }
}
