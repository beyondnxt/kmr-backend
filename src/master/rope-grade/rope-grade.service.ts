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

    async findAll(page: number | 'all' = 1, limit: number = 10, ropeTypeName: string): Promise<{ data: any[], fetchedCount: number, totalCount: number }> {
        const where: any = {};

        let queryBuilder = this.ropeGradeRepository.createQueryBuilder('ropeGrade')
            .leftJoinAndSelect('ropeGrade.ropeType', 'ropeType', 'ropeType.deleted = :deleted', { deleted: false })
            .where('ropeGrade.deleted = :deleted', { deleted: false })
            .andWhere(where);

        if (ropeTypeName) {
            queryBuilder = queryBuilder.andWhere('ropeType.ropeType LIKE :ropeTypeName', { ropeTypeName: `%${ropeTypeName}%` });
        }

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
                ropeTypeId: ropeGrade ? ropeGrade.ropeTypeId : null,
                ropeTypeName: ropeGrade.ropeType ? ropeGrade.ropeType.ropeType : null,
                categoryGrade: ropeGrade.categoryGrade,
                grade: ropeGrade.grade,
                rmComb: ropeGrade.rmComb,
                deleted: ropeGrade.deleted,
                createdBy: ropeGrade.createdBy,
                createdOn: ropeGrade.createdOn,
                updatedBy: ropeGrade.updatedBy,
                updatedOn: ropeGrade.updatedOn
            })),
            fetchedCount: ropeGrade.length,
            totalCount: totalCount
        };
    }

    async getRopeGradeName(): Promise<{ data: any[] }> {
        const ropeGrade = await this.ropeGradeRepository.find({ where: { deleted: false } });
        return {
            data: ropeGrade.map(ropeGrade => ({
                id: ropeGrade.id,
                grade: ropeGrade.grade
            })),
        };
    }

    async findOne(id: number): Promise<RopeGrade> {
        const ropeGrade = await this.ropeGradeRepository.findOne({ where: { id, deleted: false } });
        if (!ropeGrade) {
            throw new NotFoundException('RopeGrade not found');
        }
        return ropeGrade;
    }

    async update(id: number, RopeGradeData: CreateRopeGradeDto, userId): Promise<RopeGrade> {
        try {
            const ropeGrade = await this.ropeGradeRepository.findOne({ where: { id, deleted: false } });
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
        const ropeGrade = await this.ropeGradeRepository.findOne({ where: { id, deleted: false } });
        if (!ropeGrade) {
            throw new NotFoundException('Rope grade not found');
        }
        ropeGrade.deleted = true
        await this.ropeGradeRepository.save(ropeGrade);
        return { message: `Successfully deleted id ${id}` }
    }
}
