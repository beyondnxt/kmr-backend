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

    async findAll(page: number | 'all' = 1, limit: number = 10): Promise<{ data: any[], fetchedCount: number, totalCount: number }> {
        const where: any = {};

        let queryBuilder = this.CategoryRepository.createQueryBuilder('category')
            .leftJoinAndSelect('category.parentCategory', 'parentCategory', 'parentCategory.deleted = :deleted', { deleted: false })
            .where('category.deleted = :deleted', { deleted: false })
            .leftJoinAndSelect('category.childCategory', 'childCategory', 'childCategory.deleted = :deleted', { deleted: false })
            .leftJoinAndSelect('category.subCategory', 'subCategory', 'subCategory.deleted = :deleted', { deleted: false })
            .andWhere(where);

        // if (ropeTypeName) {
        //     queryBuilder = queryBuilder.andWhere('ropeType.ropeType LIKE :ropeTypeName', { ropeTypeName: `%${ropeTypeName}%` });
        // }

        if (page !== "all") {
            const skip = (page - 1) * limit;
            queryBuilder = queryBuilder.skip(skip).take(limit);
        }

        const [category, totalCount] = await Promise.all([
            queryBuilder.getMany(),
            queryBuilder.getCount()
        ]);
        return {
            data: category.map(category => ({
                id: category.id,
                parentCategoryId: category.parentCategoryId,
                parentCategoryName: category.parentCategory.name,
                childCategoryId: category.childCategoryId,
                childCategoryName: category.childCategory.name,
                subCategoryId: category.subCategoryId,
                subCategoryName: category.subCategory.name,
                type: category.type,
                grade: category.grade,
                smsCategory: category.smsCategory,
                deleted: category.deleted,
                createdBy: category.createdBy,
                createdOn: category.createdOn,
                updatedBy: category.updatedBy,
                updatedOn: category.updatedOn
            })),
            fetchedCount: category.length,
            totalCount: totalCount
        };
    }

    async getCategoryName(): Promise<{ data: any[] }> {
        const categories = await this.CategoryRepository.createQueryBuilder('category')
            .leftJoinAndSelect('category.parentCategory', 'parentCategory', 'parentCategory.deleted = :deleted', { deleted: false })
            .where('category.deleted = :deleted', { deleted: false })
            .leftJoinAndSelect('category.childCategory', 'childCategory', 'childCategory.deleted = :deleted', { deleted: false })
            .leftJoinAndSelect('category.subCategory', 'subCategory', 'subCategory.deleted = :deleted', { deleted: false })
            .getMany();

        return {
            data: categories.map(category => {
                const parentCategoryName = category.parentCategory ? category.parentCategory.name : '';
                const childCategoryName = category.childCategory ? category.childCategory.name : '';
                const subCategoryName = category.subCategory ? category.subCategory.name : '';
                const categoryPath = `${parentCategoryName}/${childCategoryName}/${subCategoryName}`;

                return {
                    id: category.id,
                    categoryName: categoryPath,
                };
            }),
        };
    }

    async findOne(id: number): Promise<Category> {
        const Category = await this.CategoryRepository.findOne({ where: { id, deleted: false } });
        if (!Category) {
            throw new NotFoundException('Category not found');
        }
        return Category;
    }

    async update(id: number, categoryData: CreatecategoryDto, userId): Promise<Category> {
        try {
            const Category = await this.CategoryRepository.findOne({ where: { id, deleted: false } });
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
        const existingCategory = await this.CategoryRepository.findOne({ where: { id, deleted: false } });
        if (!existingCategory) {
            throw new NotFoundException('Category not found');
        }
        existingCategory.deleted = true
        await this.CategoryRepository.save(existingCategory);
        return { message: `Successfully deleted id ${id}` }
    }
}

