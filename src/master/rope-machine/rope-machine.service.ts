import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateRopeMachineDto } from './dto/rope-machine.dto';
import { RopeMachine } from './entity/rope-machine.entity';

@Injectable()
export class RopeMachineService {
    constructor(
        @InjectRepository(RopeMachine)
        private readonly ropeMachineRepository: Repository<RopeMachine>
    ) { }

    async create(ropeMachineData: CreateRopeMachineDto, userId: number): Promise<RopeMachine> {
        const ropeMachine = this.ropeMachineRepository.create(ropeMachineData);
        ropeMachine.createdBy = userId
        return await this.ropeMachineRepository.save(ropeMachine);
    }

    async findAll(page: number | 'all' = 1, limit: number = 10, machineName: string): Promise<{ data: any[], fetchedCount: number, totalCount: number }> {
        const where: any = {};

        if (machineName) {
            where.machineName = Like(`%${machineName}%`);
        }

        let queryBuilder = this.ropeMachineRepository.createQueryBuilder('ropeMachine')
            .leftJoinAndSelect('ropeMachine.company', 'company', 'company.deleted = :deleted', { deleted: false })
            .where('ropeMachine.deleted = :deleted', { deleted: false })
            .andWhere(where);

        if (page !== "all") {
            const skip = (page - 1) * limit;
            queryBuilder = queryBuilder.skip(skip).take(limit);
        }

        const [ropeMachine, totalCount] = await Promise.all([
            queryBuilder.getMany(),
            queryBuilder.getCount()
        ]);
        return {
            data: ropeMachine.map(ropeMachine => ({
                id: ropeMachine.id,
                location: ropeMachine.location,
                locationName: ropeMachine.company.location,
                machineName: ropeMachine.machineName,
                shortCode: ropeMachine.shortCode,
                maximumCoilingHead: ropeMachine.maximumCoilingHead,
                noOfStrand: ropeMachine.noOfStrand,
                spindlePerStrand: ropeMachine.spindlePerStrand,
                itemCode: ropeMachine.itemCode,
                hourProduction: ropeMachine.hourProduction,
                runningHours: ropeMachine.runningHours,
                deleted: ropeMachine.deleted,
                createdBy: ropeMachine.createdBy,
                createdOn: ropeMachine.createdOn,
                updatedBy: ropeMachine.updatedBy,
                updatedOn: ropeMachine.updatedOn
            })),
            fetchedCount: ropeMachine.length,
            totalCount: totalCount
        };
    }

    async findOne(id: number): Promise<RopeMachine> {
        const ropeMachine = await this.ropeMachineRepository.findOne({ where: { id, deleted: false } });
        if (!ropeMachine) {
            throw new NotFoundException('ropeMachine not found');
        }
        return ropeMachine;
    }

    async update(id: number, ropeMachineData: CreateRopeMachineDto, userId): Promise<RopeMachine> {
        try {
            const ropeMachine = await this.ropeMachineRepository.findOne({ where: { id, deleted: false } });
            if (!ropeMachine) {
                throw new NotFoundException(`ropeMachine with ID ${id} not found`);
            }
            ropeMachine.updatedBy = userId
            Object.assign(ropeMachine, ropeMachineData);
            return await this.ropeMachineRepository.save(ropeMachine);
        } catch (error) {
            throw new Error(`Unable to update ropeMachine : ${error.message}`);
        }
    }

    async remove(id: number): Promise<any> {
        const ropeMachine = await this.ropeMachineRepository.findOne({ where: { id, deleted: false } });
        if (!ropeMachine) {
            throw new NotFoundException('Rope kg lenght not found');
        }
        ropeMachine.deleted = true
        await this.ropeMachineRepository.save(ropeMachine);
        return { message: `Successfully deleted id ${id}` }
    }
}
