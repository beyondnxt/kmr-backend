import { Injectable, NotFoundException } from '@nestjs/common';
import { Department } from './entity/department.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/department.dto';

@Injectable()
export class DepartmentService {
    constructor(
        @InjectRepository(Department)
        private readonly departmentRepository: Repository<Department>
    ) { }

    async create(departmentData: CreateDepartmentDto, userId: number): Promise<Department> {
        const department = this.departmentRepository.create(departmentData);
        department.createdBy = userId
        return await this.departmentRepository.save(department);
    }

    async findAll(page: number | "all" = 1, limit: number = 10, departmentName: string): Promise<{ data: any[], fetchedCount: number, totalCount: number }> {
        const where: any = {};
        if (departmentName) {
            where.departmentName = Like(`%${departmentName}%`);
        }
        let queryBuilder = this.departmentRepository.createQueryBuilder('department')
            .leftJoinAndSelect('department.company', 'company', 'company.deleted = :deleted', { deleted: false })
            .where('department.deleted = :deleted', { deleted: false })
            .andWhere(where);

        if (page !== "all") {
            const skip = (page - 1) * limit;
            queryBuilder = queryBuilder.skip(skip).take(limit);
        }

        const [department, totalCount] = await Promise.all([
            queryBuilder.getMany(),
            queryBuilder.getCount()
        ]);
        return {
            data: department.map(department => ({
                id: department.id,
                departmentName: department.departmentName,
                location: department.location,
                locationName: department.company.location,
                type: department.type,
                deleted: department.deleted,
                createdBy: department.createdBy,
                createdOn: department.createdOn,
                updatedBy: department.updatedBy,
                updatedOn: department.updatedOn
            })),
            fetchedCount: department.length,
            totalCount: totalCount
        };
    }

    async getDepartmentName(): Promise<{ data: any[] }> {
        const departments = await this.departmentRepository.find({ where: { deleted: false } });
        return {
            data: departments.map(department => ({
                id: department.id,
                departmentName: department.departmentName
            })),
        };
    }

    async findOne(id: number): Promise<Department> {
        const department = await this.departmentRepository.findOne({ where: { id, deleted: false } });
        if (!department) {
            throw new NotFoundException('Department not found');
        }
        return department;
    }

    async update(id: number, departmentData: CreateDepartmentDto, userId): Promise<Department> {
        try {
            const department = await this.departmentRepository.findOne({ where: { id, deleted: false } });
            if (!department) {
                throw new NotFoundException(`Department with ID ${id} not found`);
            }
            department.updatedBy = userId
            Object.assign(department, departmentData);
            return await this.departmentRepository.save(department);
        } catch (error) {
            throw new Error(`Unable to update Department : ${error.message}`);
        }
    }

    async remove(id: number): Promise<any> {
        const department = await this.departmentRepository.findOne({ where: { id, deleted: false } });
        if (!department) {
            throw new NotFoundException('department not found');
        }
        department.deleted = true
        await this.departmentRepository.save(department);
        return { message: `Successfully deleted id ${id}` }
    }
}
