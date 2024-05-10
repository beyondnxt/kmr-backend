import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RopeKgLenght } from './entity/rope-kg-length.entity';
import { CreateRopeKgLenghtDto } from './dto/rope-kg-lenght.dto';

@Injectable()
export class RopeKgLenghtService {
    constructor(
        @InjectRepository(RopeKgLenght)
        private readonly ropeKgLenghtRepository: Repository<RopeKgLenght>
    ) { }

    async create(ropeKgLenghtData: CreateRopeKgLenghtDto, userId: number): Promise<RopeKgLenght> {
        const ropeKgLenght = this.ropeKgLenghtRepository.create(ropeKgLenghtData);
        ropeKgLenght.createdBy = userId
        return await this.ropeKgLenghtRepository.save(ropeKgLenght);
    }

    async findAll(page: number | 'all' = 1, limit: number = 10): Promise<{ data: any[], fetchedCount: number, totalCount: number }> {
        const where: any = {};

        let queryBuilder = this.ropeKgLenghtRepository.createQueryBuilder('RopeKgLenght')
            .leftJoinAndSelect('RopeKgLenght.company', 'company')
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
                createdBy: ropeKgLenght.createdBy,
                createdon: ropeKgLenght.createdOn,
                updatedBy: ropeKgLenght.updatedBy,
                updatedOn: ropeKgLenght.updatedOn
            })),
            fetchedCount: ropeKgLenght.length,
            totalCount: totalCount
        };
    }

    async findOne(id: number): Promise<RopeKgLenght> {
        const ropeKgLenght = await this.ropeKgLenghtRepository.findOne({ where: { id } });
        if (!ropeKgLenght) {
            throw new NotFoundException('RopeKgLenght not found');
        }
        return ropeKgLenght;
    }

    async update(id: number, ropeKgLenghtData: CreateRopeKgLenghtDto, userId): Promise<RopeKgLenght> {
        try {
            const ropeKgLenght = await this.ropeKgLenghtRepository.findOne({ where: { id } });
            if (!ropeKgLenght) {
                throw new NotFoundException(`RopeKgLenght with ID ${id} not found`);
            }
            ropeKgLenght.updatedBy = userId
            Object.assign(ropeKgLenght, ropeKgLenghtData);
            return await this.ropeKgLenghtRepository.save(ropeKgLenght);
        } catch (error) {
            throw new Error(`Unable to update RopeKgLenght : ${error.message}`);
        }
    }

    async remove(id: number): Promise<any> {
        const existingRopeKgLenght = await this.ropeKgLenghtRepository.findOne({ where: { id } });
        if (!existingRopeKgLenght) {
            throw new NotFoundException('RopeKgLenght not found');
        }
        await this.ropeKgLenghtRepository.remove(existingRopeKgLenght);
        return { message: `Successfully deleted id ${id}` }
    }
}
