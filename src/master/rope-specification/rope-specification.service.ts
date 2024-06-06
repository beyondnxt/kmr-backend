import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateRopeSpecification } from './dto/rope-specification.dto';
import { RopeSpecification } from './entity/rope-specification.entity';

@Injectable()
export class RopeSpecificationService {
    constructor(
        @InjectRepository(RopeSpecification)
        private readonly ropeSpecificationRepository: Repository<RopeSpecification>
    ) { }

    async create(ropeSpecificationData: CreateRopeSpecification, userId: number): Promise<RopeSpecification> {
        const ropeSpecification = this.ropeSpecificationRepository.create(ropeSpecificationData);
        ropeSpecification.createdBy = userId
        return await this.ropeSpecificationRepository.save(ropeSpecification);
    }

    async findAll(page: number | 'all' = 1, limit: number = 10, customer: string): Promise<{ data: any[], fetchedCount: number, totalCount: number }> {
        const where: any = {};

        if (customer) {
            where.customer = Like(`%${customer}%`);
        }

        let queryBuilder = this.ropeSpecificationRepository.createQueryBuilder('ropeSpecification')
            .leftJoinAndSelect('ropeSpecification.ropeGrade', 'ropeGrade', 'ropeGrade.deleted = :deleted', { deleted: false })
            .where('ropeSpecification.deleted = :deleted', { deleted: false })
            .andWhere(where);

        if (page !== "all") {
            const skip = (page - 1) * limit;
            queryBuilder = queryBuilder.skip(skip).take(limit);
        }

        const [ropeSpecification, totalCount] = await Promise.all([
            queryBuilder.getMany(),
            queryBuilder.getCount()
        ]);
        return {
            data: ropeSpecification.map(specification => ({
                id: specification.id,
                deleted: specification.deleted,
                createdBy: specification.createdBy,
                createdOn: specification.createdOn,
                updatedBy: specification.updatedBy,
                updatedOn: specification.updatedOn
            })),
            fetchedCount: ropeSpecification.length,
            totalCount: totalCount
        };
    }

    async findOne(id: number): Promise<RopeSpecification> {
        const ropeSpecification = await this.ropeSpecificationRepository.findOne({ where: { id, deleted: false } });
        if (!ropeSpecification) {
            throw new NotFoundException(`Rope specification with ID ${id} not found`);
        }
        return ropeSpecification;
    }

    async update(id: number, ropeSpecificationData: CreateRopeSpecification, userId): Promise<RopeSpecification> {
        try {
            const ropeSpecification = await this.ropeSpecificationRepository.findOne({ where: { id, deleted: false } });
            if (!ropeSpecification) {
                throw new NotFoundException(`Rope specification with ID ${id} not found`);
            }
            ropeSpecification.updatedBy = userId
            Object.assign(ropeSpecification, ropeSpecificationData);
            return await this.ropeSpecificationRepository.save(ropeSpecification);
        } catch (error) {
            throw new Error(`Unable to update rope specification : ${error.message}`);
        }
    }

    async remove(id: number): Promise<any> {
        const ropeSpecification = await this.ropeSpecificationRepository.findOne({ where: { id, deleted: false } });
        if (!ropeSpecification) {
            throw new NotFoundException(`Rope specification with ID ${id} not found`);
        }
        ropeSpecification.deleted = true
        await this.ropeSpecificationRepository.save(ropeSpecification);
        return { message: `Successfully deleted id ${id}` }
    }
}
