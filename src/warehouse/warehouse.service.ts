import { Injectable, NotFoundException } from '@nestjs/common';
import { Warehouse } from './entity/warehouse.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWarehouseDto } from './dto/warehouse.dto';

@Injectable()
export class WarehouseService {
    constructor(
        @InjectRepository(Warehouse)
        private readonly warehouseRepository: Repository<Warehouse>
    ) { }

    async create(warehouseData: CreateWarehouseDto, userId: number): Promise<Warehouse> {
        const warehouse = this.warehouseRepository.create(warehouseData);
        warehouse.createdBy = userId
        return await this.warehouseRepository.save(warehouse);
    }

    async findAll(page: number = 1, limit: number = 10): Promise<{ data: Warehouse[], totalCount: number }> {
        const [data, totalCount] = await this.warehouseRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });
        return { data, totalCount };
    }

    async findOne(id: number): Promise<Warehouse> {
        const warehouse = await this.warehouseRepository.findOne({ where: { id } });
        if (!warehouse) {
            throw new NotFoundException('Warehouse not found');
        }
        return warehouse;
    }

    async update(id: number, warehouseData: CreateWarehouseDto, userId): Promise<Warehouse> {
        try {
            const warehouse = await this.warehouseRepository.findOne({ where: { id } });
            if (!warehouse) {
                throw new NotFoundException(`Warehouse with ID ${id} not found`);
            }
            warehouse.updatedBy = userId
            Object.assign(warehouse, warehouseData);
            return await this.warehouseRepository.save(warehouse);
        } catch (error) {
            throw new Error(`Unable to update Warehouse : ${error.message}`);
        }
    }

    async remove(id: number): Promise<any> {
        const existingWarehouse = await this.warehouseRepository.findOne({ where: { id } });
        if (!existingWarehouse) {
            throw new NotFoundException('Warehouse not found');
        }
        await this.warehouseRepository.remove(existingWarehouse);
        return { message: `Successfully deleted id ${id}` }
    }
}
