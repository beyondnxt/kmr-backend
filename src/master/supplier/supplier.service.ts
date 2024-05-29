import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entity/supplier.entity';
import { Like, Repository } from 'typeorm';
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

    async findAll(page: number | 'all' = 1, limit: number = 10, name: string): Promise<{ data: any[], fetchedCount: number, totalCount: number }> {
        const where: any = {};
        if (name) {
            where.name = Like(`%${name}%`);
        }
        let queryBuilder = this.supplierRepository.createQueryBuilder('supplier')
            .where('supplier.deleted = :deleted', { deleted: false })
            .andWhere(where);

        if (page !== "all") {
            const skip = (page - 1) * limit;
            queryBuilder = queryBuilder.skip(skip).take(limit);
        }

        const [supplier, totalCount] = await Promise.all([
            queryBuilder.getMany(),
            queryBuilder.getCount()
        ]);
        return {
            data: supplier.map(supplier => ({
                id: supplier.id,
                name: supplier.name,
                code: supplier.code,
                contactNo: supplier.contactNo,
                contactPerson: supplier.contactPerson,
                vatTin: supplier.vatTin,
                cstNo: supplier.cstNo,
                pan: supplier.pan,
                email: supplier.email,
                gstIn: supplier.gstIn,
                termsOfPayment: supplier.termsOfPayment,
                productName: supplier.productName,
                address: supplier.address,
                status: supplier.status,
                deleted: supplier.deleted,
                createdBy: supplier.createdBy,
                createdOn: supplier.createdOn,
                updatedBy: supplier.updatedBy,
                updatedOn: supplier.updatedOn
            })),
            fetchedCount: supplier.length,
            totalCount: totalCount
        };
    }

    async findOne(id: number): Promise<Supplier> {
        const supplier = await this.supplierRepository.findOne({ where: { id, deleted: false } });
        if (!supplier) {
            throw new NotFoundException('Supplier not found');
        }
        return supplier;
    }

    async update(id: number, supplierData: CreateSupplierDto, userId): Promise<Supplier> {
        try {
            const supplier = await this.supplierRepository.findOne({ where: { id, deleted: false } });
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
        const supplier = await this.supplierRepository.findOne({ where: { id, deleted: false } });
        if (!supplier) {
            throw new NotFoundException('Supplier not found');
        }
        supplier.deleted = true
        await this.supplierRepository.save(supplier);
        return { message: `Successfully deleted id ${id}` }
    }
}
