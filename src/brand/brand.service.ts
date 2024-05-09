import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateBrandDto } from './dto/brand.dto';
import { Brand } from './entity/brand.entity';

@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(Brand)
        private readonly brandRepository: Repository<Brand>
    ) { }

    async create(brandData: CreateBrandDto, userId: number): Promise<Brand> {
        const brand = this.brandRepository.create(brandData);
        brand.createdBy = userId
        return await this.brandRepository.save(brand);
    }

    async findAll(page: number | "all" = 1, limit: number = 10, name: string): Promise<{ data: Brand[], fetchedCount: number, totalCount: number }> {
        const where: any = {};
        if (name) {
            where.name = Like(`%${name}%`);
        }
        let queryBuilder = this.brandRepository.createQueryBuilder('brand')
            .andWhere(where);

        if (page !== "all") {
            const skip = (page - 1) * limit;
            queryBuilder = queryBuilder.skip(skip).take(limit);
        }

        const [brand, totalCount] = await Promise.all([
            queryBuilder.getMany(),
            queryBuilder.getCount()
        ]);
        return {
            data: brand,
            fetchedCount: brand.length,
            totalCount: totalCount
        };
    }

    async findOne(id: number): Promise<Brand> {
        const brand = await this.brandRepository.findOne({ where: { id } });
        if (!brand) {
            throw new NotFoundException('Brand not found');
        }
        return brand;
    }

    async update(id: number, brandData: CreateBrandDto, userId): Promise<Brand> {
        try {
            const brand = await this.brandRepository.findOne({ where: { id } });
            if (!brand) {
                throw new NotFoundException(`Brand with ID ${id} not found`);
            }
            brand.updatedBy = userId
            Object.assign(brand, brandData);
            return await this.brandRepository.save(brand);
        } catch (error) {
            throw new Error(`Unable to update Brand : ${error.message}`);
        }
    }

    async remove(id: number): Promise<any> {
        const existingBrand = await this.brandRepository.findOne({ where: { id } });
        if (!existingBrand) {
            throw new NotFoundException('Brand not found');
        }
        await this.brandRepository.remove(existingBrand);
        return { message: `Successfully deleted id ${id}` }
    }
}
