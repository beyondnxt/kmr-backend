import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entity/company.entity';
import { Like, Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/company.dto';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>
    ) { }

    async create(companyData: CreateCompanyDto, userId: number): Promise<Company> {
        const company = this.companyRepository.create(companyData);
        company.createdBy = userId
        return await this.companyRepository.save(company);
    }

    async findAll(page: number | "all" = 1, limit: number = 10, companyName: string): Promise<{ data: Company[], fetchedCount: number, totalCount: number }> {
        const where: any = {};
        if (companyName) {
            where.companyName = Like(`%${companyName}%`);
        }
        let queryBuilder = this.companyRepository.createQueryBuilder('company')
            .where('company.deleted = :deleted', { deleted: false })
            .andWhere(where);

        if (page !== "all") {
            const skip = (page - 1) * limit;
            queryBuilder = queryBuilder.skip(skip).take(limit);
        }

        const [companies, totalCount] = await Promise.all([
            queryBuilder.getMany(),
            queryBuilder.getCount()
        ]);
        return {
            data: companies,
            fetchedCount: companies.length,
            totalCount: totalCount
        };
    }

    async getCompanyName(): Promise<{ data: any[] }> {
        const company = await this.companyRepository.find({ where: { deleted: false } });
        return {
            data: company.map(company => ({
                id: company.id,
                companyName: company.companyName
            })),
        };
    }

    async findOne(id: number): Promise<Company> {
        const company = await this.companyRepository.findOne({ where: { id, deleted: false } });
        if (!company) {
            throw new NotFoundException('company not found');
        }
        return company;
    }

    async update(id: number, companyData: CreateCompanyDto, userId): Promise<Company> {
        try {
            const company = await this.companyRepository.findOne({ where: { id, deleted: false } });
            if (!company) {
                throw new NotFoundException(`company with ID ${id} not found`);
            }
            company.updatedBy = userId
            Object.assign(company, companyData);
            return await this.companyRepository.save(company);
        } catch (error) {
            throw new Error(`Unable to update company : ${error.message}`);
        }
    }

    async remove(id: number): Promise<any> {
        const company = await this.companyRepository.findOne({ where: { id, deleted: false } });
        if (!company) {
            throw new NotFoundException('company not found');
        }
        company.deleted = true
        await this.companyRepository.save(company);
        return { message: `Successfully deleted id ${id}` }
    }
}