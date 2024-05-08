import { Injectable, NotFoundException } from '@nestjs/common';
import { SalesLead } from './entity/sales-lead.entity';
import { CreateSalesLeadDto } from './dto/sales-lead.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

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

    async findAll(page: number | 'all' = 1, limit: number = 10, name: string): Promise<{ data: any[], fetchedCount: number, totalCount: number }> {
        const where: any = {};
        if (name) {
            where.name = Like(`%${name}%`);
        }
        let queryBuilder = this.salesLeadRepository.createQueryBuilder('sales_lead')
            .leftJoinAndSelect('sales_lead.user', 'user')
            .andWhere(where);

        if (page !== "all") {
            const skip = (page - 1) * limit;
            queryBuilder = queryBuilder.skip(skip).take(limit);
        }

        const [salesLeads, totalCount] = await Promise.all([
            queryBuilder.getMany(),
            queryBuilder.getCount()
        ]);
        return {
            data: salesLeads.map(salesLead => ({
                id: salesLead.id,
                salesLeadName: salesLead.name,
                shortCode: salesLead.shortCode,
                userId: salesLead.user.id,
                userName: salesLead.user.userName,
                createdOn: salesLead.createdOn,
                createdBy: salesLead.createdBy,
                updatedOn: salesLead.updatedOn,
                updatedBy: salesLead.updatedBy
            })),
            fetchedCount: salesLeads.length,
            totalCount: totalCount
        };
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
