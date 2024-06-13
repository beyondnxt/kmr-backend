import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './entity/customer.entity';
import { CreateCustomerDto } from './dto/customer.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get()
    async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('value') name: string): Promise<{ data: Customer[], fetchedCount: number, totalCount: number }> {
        try {
            return await this.customerService.findAll(page, limit, name);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
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
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() customerData: CreateCustomerDto, @Req() req: Request): Promise<Customer> {
        try {
            const userId = req.headers['userid']
            return await this.customerService.update(id, customerData, userId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<any> {
        try {
            return await this.customerService.remove(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return await this.customerService.uploadCustomers(file);
    }
}
