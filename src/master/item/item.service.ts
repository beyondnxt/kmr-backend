import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateItemDto } from './dto/item.dto';
import { Item } from './entity/item.entity';

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>
    ) { }

    async create(itemData: CreateItemDto, userId: number): Promise<Item> {
        const item = this.itemRepository.create(itemData);
        item.createdBy = userId
        return await this.itemRepository.save(item);
    }

    async findAll(page: number | "all" = 1, limit: number = 10, itemName: string): Promise<{ data: any[], fetchedCount: number, totalCount: number }> {
        const where: any = {};
        if (itemName) {
            where.itemName = Like(`%${itemName}%`);
        }
        let queryBuilder = this.itemRepository.createQueryBuilder('item')
            .leftJoinAndSelect('item.ropeType', 'ropeType', 'ropeType.deleted = :deleted', { deleted: false })
            .leftJoinAndSelect('item.company', 'company', 'company.deleted = :deleted', { deleted: false })
            .leftJoinAndSelect('item.category', 'category', 'category.deleted = :deleted', { deleted: false })
            .leftJoinAndSelect('category.parentCategory', 'parentCategory', 'parentCategory.deleted = :deleted', { deleted: false })
            .leftJoinAndSelect('category.childCategory', 'childCategory', 'childCategory.deleted = :deleted', { deleted: false })
            .leftJoinAndSelect('category.subCategory', 'subCategory', 'subCategory.deleted = :deleted', { deleted: false })
            .leftJoinAndSelect('item.color', 'color', 'color.deleted = :deleted', { deleted: false })
            .leftJoinAndSelect('item.treasureYarnColor', 'treasureYarnColor', 'treasureYarnColor.deleted = :deleted', { deleted: false })
            .where('item.deleted = :deleted', { deleted: false })
            .andWhere(where);

        if (page !== "all") {
            const skip = (page - 1) * limit;
            queryBuilder = queryBuilder.skip(skip).take(limit);
        }

        const [item, totalCount] = await Promise.all([
            queryBuilder.getMany(),
            queryBuilder.getCount()
        ]);
        return {
            data: item.map(item => ({
                id: item.id,
                itemTypeId: item.itemTypeId ? item.itemTypeId : null,
                ropeTypeName: item.ropeType ? item.ropeType.ropeType : null,
                categoryId: item.categoryId ? item.categoryId : null,
                categoryName: `${item.category.parentCategory?.name ? item.category.parentCategory.name + '/' : ''}${item.category.childCategory?.name ? item.category.childCategory.name + '/' : ''}${item.category.subCategory?.name ? item.category.subCategory.name : ''}`,
                itemCode: item.itemCode,
                colorId: item.colorId ? item.colorId : null,
                colorName: item.color ? item.color.colorName : null,
                strand: item.strand,
                length: item.length,
                noOfTwist: item.noOfTwist,
                twineType: item.twineType,
                treasureYarn: item.treasureYarn,
                treasureYarnColorId: item.treasureYarnColorId ? item.treasureYarnColorId : null,
                treasureYarnColorName: item.treasureYarnColor ? item.treasureYarnColor.colorName : null,
                itemName: item.itemName,
                itemUnit: item.itemUnit,
                minimumStock: item.minimumStock,
                reOrderQty: item.reOrderQty,
                location: item.location? item.location: null,
                locationCode: item.company?item.company.code: null,
                currentStock: item.currentStock,
                noOfLeadDays: item.noOfLeadDays,
                kpcCode: item.kpcCode,
                description: item.description,
                smsItem: item.smsItem,
                itemImage: item.itemImage,
                deleted: item.deleted,
                createdBy: item.createdBy,
                createdOn: item.createdOn,
                updatedBy: item.updatedBy,
                updatedOn: item.updatedOn,
            })),
            fetchedCount: item.length,
            totalCount: totalCount
        };
    }

    async getitemName(): Promise<{ data: any[] }> {
        const item = await this.itemRepository.find({ where: { deleted: false } });
        return {
            data: item.map(item => ({
                id: item.id,
                itemName: item.itemName
            })),
        };
    }

    async findOne(id: number): Promise<Item> {
        const item = await this.itemRepository.findOne({ where: { id, deleted: false } });
        if (!item) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }
        return item;
    }

    async update(id: number, itemData: CreateItemDto, userId): Promise<Item> {
        try {
            const item = await this.itemRepository.findOne({ where: { id, deleted: false } });
            if (!item) {
                throw new NotFoundException(`Item with ID ${id} not found`);
            }
            item.updatedBy = userId
            Object.assign(item, itemData);
            return await this.itemRepository.save(item);
        } catch (error) {
            throw new Error(`Unable to update item : ${error.message}`);
        }
    }

    async remove(id: number): Promise<any> {
        const item = await this.itemRepository.findOne({ where: { id, deleted: false } });
        if (!item) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }
        item.deleted = true
        await this.itemRepository.save(item);
        return { message: `Successfully deleted id ${id}` }
    }
}
