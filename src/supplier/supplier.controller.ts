import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query, Req } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/supplier.dto';
import { Supplier } from './entity/supplier.entity';

@Controller('supplier')
export class SupplierController {
    constructor(
        private readonly supplierService: SupplierService
    ) { }

    @Post()
    async create(@Body() supplierData: CreateSupplierDto, @Req() req: Request) {
        try {
            const userId = req.headers['userid']
            return await this.supplierService.create(supplierData, userId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10): Promise<{ data: Supplier[], totalCount: number }> {
        try {
            return await this.supplierService.findAll(page, limit);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Supplier> {
        try {
            const department = await this.supplierService.findOne(id);
            if (!department) {
                throw new NotFoundException('Department not found');
            }
            return department;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() supplierData: CreateSupplierDto, @Req() req: Request): Promise<Supplier> {
        try {
            const userId = req.headers['userid']
            return await this.supplierService.update(id, supplierData, userId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<any> {
        try {
            return await this.supplierService.remove(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
