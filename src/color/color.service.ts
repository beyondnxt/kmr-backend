import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from './entity/color.entiry';
import { Like, Repository } from 'typeorm';
import { CreateColorDto } from './dto/color.dto';

@Injectable()
export class ColorService {
    constructor(
        @InjectRepository(Color)
        private readonly colorRepository: Repository<Color>
    ) { }

    async create(colorData: CreateColorDto, userId: number): Promise<Color> {
        const color = this.colorRepository.create(colorData);
        color.createdBy = userId
        return await this.colorRepository.save(color);
    }

    async findAll(page: number | 'all' = 1, limit: number = 10, colorName: string): Promise<{ data: Color[], fetchedCount: number, totalCount: number }> {
        const where: any = {};
        if (colorName) {
            where.colorName = Like(`%${colorName}%`);
        }
        let queryBuilder = this.colorRepository.createQueryBuilder('color')
            .where('color.deleted = :deleted', { deleted: false })
            .andWhere(where);

        if (page !== "all") {
            const skip = (page - 1) * limit;
            queryBuilder = queryBuilder.skip(skip).take(limit);
        }

        const [color, totalCount] = await Promise.all([
            queryBuilder.getMany(),
            queryBuilder.getCount()
        ]);
        return {
            data: color,
            fetchedCount: color.length,
            totalCount: totalCount
        };
    }

    async findOne(id: number): Promise<Color> {
        const color = await this.colorRepository.findOne({ where: { id, deleted: false } });
        if (!color) {
            throw new NotFoundException('Color not found');
        }
        return color;
    }

    async update(id: number, colorData: CreateColorDto, userId): Promise<Color> {
        try {
            const color = await this.colorRepository.findOne({ where: { id, deleted: false } });
            if (!color) {
                throw new NotFoundException(`Color with ID ${id} not found`);
            }
            color.updatedBy = userId
            Object.assign(color, colorData);
            return await this.colorRepository.save(color);
        } catch (error) {
            throw new Error(`Unable to update Color : ${error.message}`);
        }
    }

    async remove(id: number): Promise<any> {
        const color = await this.colorRepository.findOne({ where: { id, deleted: false } });
        if (!color) {
            throw new NotFoundException('Color not found');
        }
        color.deleted = true
        await this.colorRepository.save(color);
        return { message: `Successfully deleted id ${id}` }
    }
}
