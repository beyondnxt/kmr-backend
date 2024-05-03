import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './entity/customer.entity';
import { CreateCustomerDto } from './dto/customer.dto';

@Controller('customer')
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService
    ) { }

    @Post()
    async create(@Body() customerData: CreateCustomerDto, @Req() req: Request) {
        try {
            const userId = req.headers['userid']
            return await this.customerService.create(customerData, userId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10): Promise<{ Customer: Customer[], totalCount: number }> {
        try {
            return await this.customerService.findAll(page, limit);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Customer> {
        try {
            const Customer = await this.customerService.findOne(id);
            if (!Customer) {
                throw new NotFoundException('Customer not found');
            }
            return Customer;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() customerData: CreateCustomerDto, @Req() req: Request): Promise<Customer> {
        try {
            const userId = req.headers['userid']
            return await this.customerService.update(id, customerData, userId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<any> {
        try {
            return await this.customerService.remove(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
