import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MainCustomer } from './entity/main-customer.entity';
import { Repository } from 'typeorm';
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

    async findAll(page: number = 1, limit: number = 10): Promise<{ mainCustomer: MainCustomer[], totalCount: number }> {
        const [mainCustomer, totalCount] = await this.mainCustomerRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });
        return { mainCustomer, totalCount };
    }

    async findOne(id: number): Promise<MainCustomer> {
        const mainCustomer = await this.mainCustomerRepository.findOne({ where: { id } });
        if (!mainCustomer) {
            throw new NotFoundException('mainCustomer not found');
        }
        return mainCustomer;
    }

    async update(id: number, mainCustomerData: CreateMainCustomerDto, userId): Promise<MainCustomer> {
        try {
            const mainCustomer = await this.mainCustomerRepository.findOne({ where: { id } });
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
        const existingmainCustomer = await this.mainCustomerRepository.findOne({ where: { id } });
        if (!existingmainCustomer) {
            throw new NotFoundException('mainCustomer not found');
        }
        await this.mainCustomerRepository.remove(existingmainCustomer);
        return { message: `Successfully deleted id ${id}` }
    }
}
