import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateExtruderDto } from './dto/extruder.dto';
import { Extruder } from './entity/extruder.entity';

@Injectable()
export class ExtruderService {
    constructor(
        @InjectRepository(Extruder)
        private readonly extruderRepository: Repository<Extruder>
    ) { }

    async create(extruderData: CreateExtruderDto, userId: number): Promise<Extruder> {
        const extruder = this.extruderRepository.create(extruderData);
        extruder.createdBy = userId
        return await this.extruderRepository.save(extruder);
    }

    async findAll(page: number | "all" = 1, limit: number = 10, machineName: string): Promise<{ data: any[], fetchedCount: number, totalCount: number }> {
        const where: any = {};
        if (machineName) {
            where.machineName = Like(`%${machineName}%`);
        }
        let queryBuilder = this.extruderRepository.createQueryBuilder('extruder')
            .leftJoinAndSelect('extruder.company', 'company', 'company.deleted = :deleted', { deleted: false })
            .where('extruder.deleted = :deleted', { deleted: false })
            .andWhere(where);

        if (page !== "all") {
            const skip = (page - 1) * limit;
            queryBuilder = queryBuilder.skip(skip).take(limit);
        }

        const [extruder, totalCount] = await Promise.all([
            queryBuilder.getMany(),
            queryBuilder.getCount()
        ]);
        return {
            data: extruder.map(extruder => ({
                id: extruder.id,
                machineName: extruder.machineName,
                shortCode: extruder.shortCode,
                location: extruder ? extruder.location : null,
                locationName: extruder.company ? extruder.company.location : null,
                code: extruder.code,
                rpm: extruder.rpm,
                target: extruder.target,
                runningTime: extruder.runningTime,
                spindle: extruder.spindle,
                deleted: extruder.deleted,
                createdBy: extruder.createdBy,
                createdOn: extruder.createdOn,
                updatedBy: extruder.updatedBy,
                updatedOn: extruder.updatedOn
            })),
            fetchedCount: extruder.length,
            totalCount: totalCount
        };
    }

    async findOne(id: number): Promise<Extruder> {
        const extruder = await this.extruderRepository.findOne({ where: { id, deleted: false } });
        if (!extruder) {
            throw new NotFoundException(`Extruder with ID ${id} not found`);
        }
        return extruder;
    }

    async update(id: number, extruderData: CreateExtruderDto, userId): Promise<Extruder> {
        try {
            const extruder = await this.extruderRepository.findOne({ where: { id, deleted: false } });
            if (!extruder) {
                throw new NotFoundException(`Extruder with ID ${id} not found`);
            }
            extruder.updatedBy = userId
            Object.assign(extruder, extruderData);
            return await this.extruderRepository.save(extruder);
        } catch (error) {
            throw new Error(`Unable to update extruder : ${error.message}`);
        }
    }

    async remove(id: number): Promise<any> {
        const extruder = await this.extruderRepository.findOne({ where: { id, deleted: false } });
        if (!extruder) {
            throw new NotFoundException(`Extruder with ID ${id} not found`);
        }
        extruder.deleted = true
        await this.extruderRepository.save(extruder);
        return { message: `Successfully deleted id ${id}` }
    }
}
