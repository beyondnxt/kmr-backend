import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRopeDieDto } from './dto/rope-die.dto';
import { RopeDie } from './entity/rope-die.entity';

@Injectable()
export class RopeDieService {
    constructor(
        @InjectRepository(RopeDie)
        private readonly ropeDieRepository: Repository<RopeDie>
    ) { }

    async create(ropeDieData: CreateRopeDieDto, userId: number): Promise<RopeDie> {
        const ropeDie = this.ropeDieRepository.create(ropeDieData);
        ropeDie.createdBy = userId
        return await this.ropeDieRepository.save(ropeDie);
    }

    async findAll(page: number | 'all' = 1, limit: number = 10): Promise<{ data: any[], fetchedCount: number, totalCount: number }> {
        const where: any = {};

        let queryBuilder = this.ropeDieRepository.createQueryBuilder('ropeDie')
            .where('ropeDie.deleted = :deleted', { deleted: false })
            .andWhere(where)

        if (page !== "all") {
            const skip = (page - 1) * limit;
            queryBuilder = queryBuilder.skip(skip).take(limit);
        }

        const [ropeDie, totalCount] = await Promise.all([
            queryBuilder.getMany(),
            queryBuilder.getCount()
        ]);
        return {
            data: ropeDie.map(ropeDie => ({
                id: ropeDie.id,
                itemCode: ropeDie.itemCode,
                tapeDia: ropeDie.tapeDia,
                noOfJoint: ropeDie.noOfJoint,
                strandDenier: ropeDie.strandDenier,
                singleTapeDenier: ropeDie.singleTapeDenier,
                noOfTape: ropeDie.noOfTape,
                totalDenier: ropeDie.totalDenier,
                deleted: ropeDie.deleted,
                createdBy: ropeDie.createdBy,
                createdOn: ropeDie.createdOn,
                updatedBy: ropeDie.updatedBy,
                updatedOn: ropeDie.updatedOn
            })),
            fetchedCount: ropeDie.length,
            totalCount: totalCount
        };
    }

    async findOne(id: number): Promise<RopeDie> {
        const ropeDie = await this.ropeDieRepository.findOne({ where: { id, deleted: false } });
        if (!ropeDie) {
            throw new NotFoundException(`RopeDie with ID ${id} not found`);
        }
        return ropeDie;
    }

    async update(id: number, ropeDieData: CreateRopeDieDto, userId): Promise<RopeDie> {
        try {
            const ropeDie = await this.ropeDieRepository.findOne({ where: { id, deleted: false } });
            if (!ropeDie) {
                throw new NotFoundException(`RopeDie with ID ${id} not found`);
            }
            ropeDie.updatedBy = userId
            Object.assign(ropeDie, ropeDieData);
            return await this.ropeDieRepository.save(ropeDie);
        } catch (error) {
            throw new Error(`Unable to update ropeDie : ${error.message}`);
        }
    }

    async remove(id: number): Promise<any> {
        const ropeDie = await this.ropeDieRepository.findOne({ where: { id, deleted: false } });
        if (!ropeDie) {
            throw new NotFoundException(`RopeDie with ID ${id} not found`);
        }
        ropeDie.deleted = true
        await this.ropeDieRepository.save(ropeDie);
        return { message: `Successfully deleted id ${id}` }
    }
}
