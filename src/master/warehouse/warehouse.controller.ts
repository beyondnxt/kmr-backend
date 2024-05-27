import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query, Req } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { Warehouse } from './entity/warehouse.entity';
import { CreateWarehouseDto } from './dto/warehouse.dto';

@Controller('warehouse')
export class WarehouseController {
    constructor(
        private readonly warehouseService: WarehouseService
    ) { }

    @Post()
    async create(@Body() warehouseData: CreateWarehouseDto, @Req() req: Request) {
        try {
            const userId = req.headers['userid']
            return await this.warehouseService.create(warehouseData, userId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10): Promise<{ data: Warehouse[], totalCount: number }> {
        try {
            return await this.warehouseService.findAll(page, limit);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Warehouse> {
        try {
            const warehouse = await this.warehouseService.findOne(id);
            if (!warehouse) {
                throw new NotFoundException('Warehouse not found');
            }
            return warehouse;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() warehouseData: CreateWarehouseDto, @Req() req: Request): Promise<Warehouse> {
        try {
            const userId = req.headers['userid']
            return await this.warehouseService.update(id, warehouseData, userId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<any> {
        try {
            return await this.warehouseService.remove(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
