import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateTwineTypeDto } from './dto/twine-type.dto';
import { TwineType } from './entity/twine-type.entity';

@Injectable()
export class TwineTypeService {
    constructor(
        @InjectRepository(TwineType)
        private readonly twineTypeRepository: Repository<TwineType>,
    ) { }

    async createTwineType(twinTypeData: CreateTwineTypeDto, userId: number): Promise<TwineType> {
        try {
            const twineType = this.twineTypeRepository.create(twinTypeData);
            twineType.createdBy = userId
            return await this.twineTypeRepository.save(twineType);
        } catch (error) {
            throw new Error(`Unable to create twineType : ${error.message}`);
        }
    }

    async getAlltwineTypes(page: number | 'all' = 1, limit: number = 10, name: string): Promise<{ data: any[]; fetchedCount: number, totalCount: number }> {
        const where: any = {};
        if (name) {
            where.name = Like(`%${name}%`);
        }
        let queryBuilder = this.twineTypeRepository.createQueryBuilder('twineType')
            .where('twineType.deleted = :deleted', { deleted: false })
            .andWhere(where);

        if (page !== "all") {
            const skip = (page - 1) * limit;
            queryBuilder = queryBuilder.skip(skip).take(limit);
        }

        const [twineType, totalCount] = await Promise.all([
            queryBuilder.getMany(),
            queryBuilder.getCount()
        ]);
        return {
            data: twineType.map(twine => ({
                id: twine.id,
                name: twine.name,
                shortCode: twine.shortCode,
                deleted: twine.deleted,
                createdBy: twine.createdBy,
                createdOn: twine.createdOn,
                updatedBy: twine.updatedBy,
                updatedOn: twine.updatedOn
            })),
            fetchedCount: twineType.length,
            totalCount: totalCount
        };
    }

    async getTwineTypeById(id: number): Promise<TwineType> {
        try {
            return await this.twineTypeRepository.findOne({ where: { id, deleted: false } });
        } catch (error) {
            throw new Error(`Unable to fetch Twine Type: ${error.message}`);
        }
    }

    async getTwineTypeName(): Promise<{ data: any[] }> {
        const twineType = await this.twineTypeRepository.find({ where: { deleted: false } });
        return {
            data: twineType.map(twine => ({
                id: twine.id,
                name: twine.name,
                shortCode: twine.shortCode
            })),
        };
    }

    async updatetwineType(id: number, twinTypeData: CreateTwineTypeDto, userId): Promise<TwineType> {
        try {
            const twineType = await this.twineTypeRepository.findOne({ where: { id, deleted: false } });
            if (!twineType) {
                throw new NotFoundException(`Twine Type with ID ${id} not found`);
            }
            twineType.updatedBy = userId
            this.twineTypeRepository.merge(twineType, twinTypeData);
            return await this.twineTypeRepository.save(twineType);
        } catch (error) {
            throw new Error(`Unable to update twineType : ${error.message}`);
        }
    }

    async remove(id: number): Promise<any> {
        const twineType = await this.twineTypeRepository.findOne({ where: { id, deleted: false } });
        if (!twineType) {
            throw new NotFoundException('Twine Type not found');
        }
        twineType.deleted = true
        await this.twineTypeRepository.save(twineType);
        return { message: `Successfully deleted id ${id}` }
    }
}
