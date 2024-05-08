import { Injectable, NotFoundException } from '@nestjs/common';
import { SalesLead } from './entity/sales-lead.entity';
import { CreateSalesLeadDto } from './dto/sales-lead.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SalesLeadService {
    constructor(
        @InjectRepository(SalesLead)
        private readonly salesLeadRepository: Repository<SalesLead>
    ) { }

    async create(salesLeadData: CreateSalesLeadDto, userId: number): Promise<SalesLead> {
        const salesLead = this.salesLeadRepository.create(salesLeadData);
        salesLead.createdBy = userId
        return await this.salesLeadRepository.save(salesLead);
    }

    async findAll(page: number = 1, limit: number = 10): Promise<{ data: SalesLead[], totalCount: number }> {
        const [data, totalCount] = await this.salesLeadRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });
        return { data, totalCount };
    }

    async findOne(id: number): Promise<SalesLead> {
        const salesLead = await this.salesLeadRepository.findOne({ where: { id } });
        if (!salesLead) {
            throw new NotFoundException('SalesLead not found');
        }
        return salesLead;
    }

    async update(id: number, salesLeadData: CreateSalesLeadDto, userId): Promise<SalesLead> {
        try {
            const salesLead = await this.salesLeadRepository.findOne({ where: { id } });
            if (!salesLead) {
                throw new NotFoundException(`SalesLead with ID ${id} not found`);
            }
            salesLead.updatedBy = userId
            Object.assign(salesLead, salesLeadData);
            return await this.salesLeadRepository.save(salesLead);
        } catch (error) {
            throw new Error(`Unable to update SalesLead : ${error.message}`);
        }
    }

    async remove(id: number): Promise<any> {
        const existingSalesLead = await this.salesLeadRepository.findOne({ where: { id } });
        if (!existingSalesLead) {
            throw new NotFoundException('SalesLead not found');
        }
        await this.salesLeadRepository.remove(existingSalesLead);
        return { message: `Successfully deleted id ${id}` }
    }
}
