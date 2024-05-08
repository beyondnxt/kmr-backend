import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entity/supplier.entity';
import { Repository } from 'typeorm';
import { CreateSupplierDto } from './dto/supplier.dto';

@Injectable()
export class SupplierService {
    constructor(
        @InjectRepository(Supplier)
        private readonly supplierRepository: Repository<Supplier>
    ) { }

    async create(supplierData: CreateSupplierDto, userId: number): Promise<Supplier> {
        const supplier = this.supplierRepository.create(supplierData);
        supplier.createdBy = userId
        return await this.supplierRepository.save(supplier);
    }

    async findAll(page: number = 1, limit: number = 10): Promise<{ data: Supplier[], totalCount: number }> {
        const [data, totalCount] = await this.supplierRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });
        return { data, totalCount };
    }

    async findOne(id: number): Promise<Supplier> {
        const supplier = await this.supplierRepository.findOne({ where: { id } });
        if (!supplier) {
            throw new NotFoundException('Supplier not found');
        }
        return supplier;
    }

    async update(id: number, supplierData: CreateSupplierDto, userId): Promise<Supplier> {
        try {
            const supplier = await this.supplierRepository.findOne({ where: { id } });
            if (!supplier) {
                throw new NotFoundException(`Supplier with ID ${id} not found`);
            }
            supplier.updatedBy = userId
            Object.assign(supplier, supplierData);
            return await this.supplierRepository.save(supplier);
        } catch (error) {
            throw new Error(`Unable to update Supplier : ${error.message}`);
        }
    }

    async remove(id: number): Promise<any> {
        const existingSupplier = await this.supplierRepository.findOne({ where: { id } });
        if (!existingSupplier) {
            throw new NotFoundException('Supplier not found');
        }
        await this.supplierRepository.remove(existingSupplier);
        return { message: `Successfully deleted id ${id}` }
    }
}
