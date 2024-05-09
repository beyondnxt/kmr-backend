import { Injectable, NotFoundException } from '@nestjs/common';
import { RawMaterialType } from './entity/raw-material-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateRawMaterialTypeDto } from './dto/raw-material-type.dto';

@Injectable()
export class RawMaterialTypeService {
    constructor(
        @InjectRepository(RawMaterialType)
        private readonly rawMaterialTypeRepository: Repository<RawMaterialType>
    ) { }

    async create(rawMaterialTypeData: CreateRawMaterialTypeDto, userId: number): Promise<RawMaterialType> {
        const rawMaterialType = this.rawMaterialTypeRepository.create(rawMaterialTypeData);
        rawMaterialType.createdBy = userId
        return await this.rawMaterialTypeRepository.save(rawMaterialType);
    }

    async findAll(page: number | "all" = 1, limit: number = 10, name: string): Promise<{ data: RawMaterialType[], fetchedCount: number, totalCount: number }> {
        const where: any = {};
        if (name) {
            where.name = Like(`%${name}%`);
        }
        let queryBuilder = this.rawMaterialTypeRepository.createQueryBuilder('raw_material_type')
            .andWhere(where);

        if (page !== "all") {
            const skip = (page - 1) * limit;
            queryBuilder = queryBuilder.skip(skip).take(limit);
        }

        const [rawMaterialType, totalCount] = await Promise.all([
            queryBuilder.getMany(),
            queryBuilder.getCount()
        ]);
        return {
            data: rawMaterialType,
            fetchedCount: rawMaterialType.length,
            totalCount: totalCount
        };
    }

    async findOne(id: number): Promise<RawMaterialType> {
        const rawMaterialType = await this.rawMaterialTypeRepository.findOne({ where: { id } });
        if (!rawMaterialType) {
            throw new NotFoundException('RawMaterial Type not found');
        }
        return rawMaterialType;
    }

    async update(id: number, rawMaterialTypeData: CreateRawMaterialTypeDto, userId): Promise<RawMaterialType> {
        try {
            const rawMaterialType = await this.rawMaterialTypeRepository.findOne({ where: { id } });
            if (!rawMaterialType) {
                throw new NotFoundException(`RawMaterialType with ID ${id} not found`);
            }
            rawMaterialType.updatedBy = userId
            Object.assign(rawMaterialType, rawMaterialTypeData);
            return await this.rawMaterialTypeRepository.save(rawMaterialType);
        } catch (error) {
            throw new Error(`Unable to update RawMaterialType : ${error.message}`);
        }
    }

    async remove(id: number): Promise<any> {
        const existingRawMaterialType = await this.rawMaterialTypeRepository.findOne({ where: { id } });
        if (!existingRawMaterialType) {
            throw new NotFoundException('RawMaterialType not found');
        }
        await this.rawMaterialTypeRepository.remove(existingRawMaterialType);
        return { message: `Successfully deleted id ${id}` }
    }
}
