import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRopeGradeDto } from './dto/rope-grade.dto';
import { RopeGrade } from './entity/rope-grade.entity';

@Injectable()
export class RopeGradeService {
    constructor(
        @InjectRepository(RopeGrade)
        private readonly ropeGradeRepository: Repository<RopeGrade>
    ) { }

    async create(ropeGradeData: CreateRopeGradeDto, userId: number): Promise<RopeGrade> {
        const ropeGrade = this.ropeGradeRepository.create(ropeGradeData);
        ropeGrade.createdBy = userId
        return await this.ropeGradeRepository.save(ropeGrade);
    }

    async findAll(page: number | 'all' = 1, limit: number = 10): Promise<{ data: any[], fetchedCount: number, totalCount: number }> {
        const where: any = {};

        let queryBuilder = this.ropeGradeRepository.createQueryBuilder('rope-grade')
            .leftJoinAndSelect('rope-grade.rope-type', 'rope-type')
            .leftJoinAndSelect('rope-grade.category', 'category')
            .andWhere(where);

        if (page !== "all") {
            const skip = (page - 1) * limit;
            queryBuilder = queryBuilder.skip(skip).take(limit);
        }

        const [ropeGrade, totalCount] = await Promise.all([
            queryBuilder.getMany(),
            queryBuilder.getCount()
        ]);
        return {
            data: ropeGrade.map(ropeGrade => ({
                id: ropeGrade.id,
                ropeTypeId: ropeGrade.ropeTypeId,
                categoryId: ropeGrade.categoryId,
                grade: ropeGrade.grade,
                rmComb: ropeGrade.rmComb,
                createdBy: ropeGrade.createdBy,
                createdon: ropeGrade.createdOn,
                updatedBy: ropeGrade.updatedBy,
                updatedOn: ropeGrade.updatedOn
            })),
            fetchedCount: ropeGrade.length,
            totalCount: totalCount
        };
    }

    async findOne(id: number): Promise<RopeGrade> {
        const ropeGrade = await this.ropeGradeRepository.findOne({ where: { id } });
        if (!ropeGrade) {
            throw new NotFoundException('RopeGrade not found');
        }
        return ropeGrade;
    }

    async update(id: number, RopeGradeData: CreateRopeGradeDto, userId): Promise<RopeGrade> {
        try {
            const ropeGrade = await this.ropeGradeRepository.findOne({ where: { id } });
            if (!ropeGrade) {
                throw new NotFoundException(`RopeGrade with ID ${id} not found`);
            }
            ropeGrade.updatedBy = userId
            Object.assign(ropeGrade, RopeGradeData);
            return await this.ropeGradeRepository.save(ropeGrade);
        } catch (error) {
            throw new Error(`Unable to update RopeGrade : ${error.message}`);
        }
    }

    async remove(id: number): Promise<any> {
        const existingRopeGrade = await this.ropeGradeRepository.findOne({ where: { id } });
        if (!existingRopeGrade) {
            throw new NotFoundException('RopeGrade not found');
        }
        await this.ropeGradeRepository.remove(existingRopeGrade);
        return { message: `Successfully deleted id ${id}` }
    }
}
