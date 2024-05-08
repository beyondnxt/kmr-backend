import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entity/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>
    ) { }

    async create(customerData: CreateCustomerDto, userId: number): Promise<Customer> {
        const Customer = this.customerRepository.create(customerData);
        Customer.createdBy = userId
        return await this.customerRepository.save(Customer);
    }

    async findAll(page: number = 1, limit: number = 10): Promise<{ data: Customer[], totalCount: number }> {
        const [data, totalCount] = await this.customerRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });
        return { data, totalCount };
    }

    async findOne(id: number): Promise<Customer> {
        const Customer = await this.customerRepository.findOne({ where: { id } });
        if (!Customer) {
            throw new NotFoundException('Customer not found');
        }
        return Customer;
    }

    async update(id: number, customerData: CreateCustomerDto, userId): Promise<Customer> {
        try {
            const Customer = await this.customerRepository.findOne({ where: { id } });
            if (!Customer) {
                throw new NotFoundException(`Customer with ID ${id} not found`);
            }
            Customer.updatedBy = userId
            Object.assign(Customer, customerData);
            return await this.customerRepository.save(Customer);
        } catch (error) {
            throw new Error(`Unable to update Customer : ${error.message}`);
        }
    }

    async remove(id: number): Promise<any> {
        const existingCustomer = await this.customerRepository.findOne({ where: { id } });
        if (!existingCustomer) {
            throw new NotFoundException('Customer not found');
        }
        await this.customerRepository.remove(existingCustomer);
        return { message: `Successfully deleted id ${id}` }
    }
}
