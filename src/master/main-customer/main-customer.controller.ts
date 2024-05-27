import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query, Req } from '@nestjs/common';
import { MainCustomerService } from './main-customer.service';
import { MainCustomer } from './entity/main-customer.entity';
import { CreateMainCustomerDto } from './dto/main-customer.dto';

@Controller('main-customer')
export class MainCustomerController {
    constructor(
        private readonly mainCustomerService: MainCustomerService
    ) { }

    @Post()
    async create(@Body() mainCustomerData: CreateMainCustomerDto, @Req() req: Request) {
        try {
            const userId = req.headers['userid']
            return await this.mainCustomerService.create(mainCustomerData, userId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get()
    async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('value') name: string): Promise<{ data: MainCustomer[], totalCount: number }> {
        try {
            return await this.mainCustomerService.findAll(page, limit, name);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get('/all')
    async getMainCustomerName(): Promise<{ data: any[] }> {
        try {
            return await this.mainCustomerService.getMainCustomerName();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<MainCustomer> {
        try {
            const mainCustomer = await this.mainCustomerService.findOne(id);
            if (!mainCustomer) {
                throw new NotFoundException('mainCustomer not found');
            }
            return mainCustomer;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() mainCustomerData: CreateMainCustomerDto, @Req() req: Request): Promise<MainCustomer> {
        try {
            const userId = req.headers['userid']
            return await this.mainCustomerService.update(id, mainCustomerData, userId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<any> {
        try {
            return await this.mainCustomerService.remove(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
