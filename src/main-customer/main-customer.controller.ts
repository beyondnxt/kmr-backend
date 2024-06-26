import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query, Req } from '@nestjs/common';
import { MainCustomerService } from './main-customer.service';
import { MainCustomer } from './entity/main-customer.entity';

@Controller('main-customer')
export class MainCustomerController {
    constructor(
        private readonly mainCustomerService: MainCustomerService
    ) { }

    @Post()
    async create(@Body() mainCustomerData: MainCustomer, @Req() req: Request) {
        try {
            const userId = req.headers['userid']
            return await this.mainCustomerService.create(mainCustomerData, userId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10): Promise<{ mainCustomer: MainCustomer[], totalCount: number }> {
        try {
            return await this.mainCustomerService.findAll(page, limit);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
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
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() mainCustomerData: MainCustomer, @Req() req: Request): Promise<MainCustomer> {
        try {
            const userId = req.headers['userid']
            return await this.mainCustomerService.update(id, mainCustomerData, userId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<any> {
        try {
            return await this.mainCustomerService.remove(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
