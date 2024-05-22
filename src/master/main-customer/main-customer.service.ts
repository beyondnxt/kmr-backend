import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MainCustomer } from './entity/main-customer.entity';
import { Like, Repository } from 'typeorm';
import { CreateMainCustomerDto } from './dto/main-customer.dto';

@Injectable()
export class MainCustomerService {
    constructor(
        @InjectRepository(MainCustomer)
        private readonly mainCustomerRepository: Repository<MainCustomer>
    ) { }

    async create(mainCustomerData: CreateMainCustomerDto, userId: number): Promise<MainCustomer> {
        const mainCustomer = this.mainCustomerRepository.create(mainCustomerData);
        mainCustomer.createdBy = userId
        return await this.mainCustomerRepository.save(mainCustomer);
    }

    async findAll(page: number | "all" = 1, limit: number = 10, name: string): Promise<{ data: MainCustomer[], fetchedCount: number, totalCount: number }> {
        const where: any = {};
        if (name) {
            where.name = Like(`%${name}%`);
        }
        let queryBuilder = this.mainCustomerRepository.createQueryBuilder('main-customer')
            .where('main-customer.deleted = :deleted', { deleted: false })
            .andWhere(where);

        if (page !== "all") {
            const skip = (page - 1) * limit;
            queryBuilder = queryBuilder.skip(skip).take(limit);
        }

        const [mainCustomer, totalCount] = await Promise.all([
            queryBuilder.getMany(),
            queryBuilder.getCount()
        ]);
        return {
            data: mainCustomer,
            fetchedCount: mainCustomer.length,
            totalCount: totalCount
        };
    }

    async getMainCustomerName(): Promise<{ data: any[] }> {
        const mainCustomer = await this.mainCustomerRepository.find({ where: { deleted: false } });
        return {
            data: mainCustomer.map(mainCustomer => ({
                id: mainCustomer.id,
                name: mainCustomer.name
            })),
        };
    }

    async findOne(id: number): Promise<MainCustomer> {
        const mainCustomer = await this.mainCustomerRepository.findOne({ where: { id, deleted: false } });
        if (!mainCustomer) {
            throw new NotFoundException('mainCustomer not found');
        }
        return mainCustomer;
    }

    async update(id: number, mainCustomerData: CreateMainCustomerDto, userId): Promise<MainCustomer> {
        try {
            const mainCustomer = await this.mainCustomerRepository.findOne({ where: { id, deleted: false } });
            if (!mainCustomer) {
                throw new NotFoundException(`mainCustomer with ID ${id} not found`);
            }
            mainCustomer.updatedBy = userId
            Object.assign(mainCustomer, mainCustomerData);
            return await this.mainCustomerRepository.save(mainCustomer);
        } catch (error) {
            throw new Error(`Unable to update mainCustomer : ${error.message}`);
        }
    }

    async remove(id: number): Promise<any> {
        const mainCustomer = await this.mainCustomerRepository.findOne({ where: { id, deleted: false } });
        if (!mainCustomer) {
            throw new NotFoundException('Main Customer not found');
        }
        mainCustomer.deleted = true
        await this.mainCustomerRepository.save(mainCustomer);
        return { message: `Successfully deleted id ${id}` }
    }
}