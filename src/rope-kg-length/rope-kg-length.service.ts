import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RopeKgLength } from './entity/rope-kg-length.entity';
import { CreateRopeKgLengthDto } from './dto/rope-kg-length.dto';

@Injectable()
export class RopeKgLengthService {
    constructor(
        @InjectRepository(RopeKgLength)
        private readonly ropeKgLenghtRepository: Repository<RopeKgLength>
    ) { }

    async create(ropeKgLengthData: CreateRopeKgLengthDto, userId: number): Promise<RopeKgLength> {
        const ropeKgLenght = this.ropeKgLenghtRepository.create(ropeKgLengthData);
        ropeKgLenght.createdBy = userId
        return await this.ropeKgLenghtRepository.save(ropeKgLenght);
    }

    async findAll(page: number | 'all' = 1, limit: number = 10): Promise<{ data: any[], fetchedCount: number, totalCount: number }> {
        const where: any = {};

        let queryBuilder = this.ropeKgLenghtRepository.createQueryBuilder('RopeKgLenght')
            .where('RopeKgLenght.deleted = :deleted', { deleted: false })
            .andWhere(where);

        if (page !== "all") {
            const skip = (page - 1) * limit;
            queryBuilder = queryBuilder.skip(skip).take(limit);
        }

        const [ropeKgLenght, totalCount] = await Promise.all([
            queryBuilder.getMany(),
            queryBuilder.getCount()
        ]);
        return {
            data: ropeKgLenght.map(ropeKgLenght => ({
                id: ropeKgLenght.id,
                code: ropeKgLenght.code,
                meterKg: ropeKgLenght.meterKg,
                deleted: ropeKgLenght.deleted,
                createdBy: ropeKgLenght.createdBy,
                createdon: ropeKgLenght.createdOn,
                updatedBy: ropeKgLenght.updatedBy,
                updatedOn: ropeKgLenght.updatedOn
            })),
            fetchedCount: ropeKgLenght.length,
            totalCount: totalCount
        };
    }

    async findOne(id: number): Promise<RopeKgLength> {
        const ropeKgLenght = await this.ropeKgLenghtRepository.findOne({ where: { id, deleted: false } });
        if (!ropeKgLenght) {
            throw new NotFoundException('RopeKgLenght not found');
        }
        return ropeKgLenght;
    }

    async update(id: number, ropeKgLengthData: CreateRopeKgLengthDto, userId): Promise<RopeKgLength> {
        try {
            const ropeKgLenght = await this.ropeKgLenghtRepository.findOne({ where: { id, deleted: false } });
            if (!ropeKgLenght) {
                throw new NotFoundException(`RopeKgLenght with ID ${id} not found`);
            }
            ropeKgLenght.updatedBy = userId
            Object.assign(ropeKgLenght, ropeKgLengthData);
            return await this.ropeKgLenghtRepository.save(ropeKgLenght);
        } catch (error) {
            throw new Error(`Unable to update RopeKgLenght : ${error.message}`);
        }
    }

    async remove(id: number): Promise<any> {
        const ropeKgLenght = await this.ropeKgLenghtRepository.findOne({ where: { id, deleted: false } });
        if (!ropeKgLenght) {
            throw new NotFoundException('Rope kg lenght not found');
        }
        ropeKgLenght.deleted = true
        await this.ropeKgLenghtRepository.save(ropeKgLenght);
        return { message: `Successfully deleted id ${id}` }
    }
}
