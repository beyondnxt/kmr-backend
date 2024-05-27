import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CreateRawMaterialTypeDto } from './dto/raw-material-type.dto';
import { RawMaterialType } from './entity/raw-material-type.entity';
import { RawMaterialTypeService } from './raw-material-type.service';

@Controller('rawMaterialType')
export class RawMaterialTypeController {
    constructor(
        private readonly rawMaterialTypeService: RawMaterialTypeService
    ) { }

    @Post()
    async create(@Body() rawMaterialTypeData: CreateRawMaterialTypeDto, @Req() req: Request) {
        try {
            const userId = req.headers['userid']
            return await this.rawMaterialTypeService.create(rawMaterialTypeData, userId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get()
    async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('value')name: string): Promise<{ data: RawMaterialType[], totalCount: number }> {
        try {
            return await this.rawMaterialTypeService.findAll(page, limit, name);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get('/all')
    async getRawMaterialName(): Promise<{ data: any[] }> {
        try {
            return await this.rawMaterialTypeService.getRawMaterialName();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<RawMaterialType> {
        try {
            return await this.rawMaterialTypeService.findOne(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() rawMaterialTypeData: CreateRawMaterialTypeDto, @Req() req: Request): Promise<RawMaterialType> {
        try {
            const userId = req.headers['userid']
            return await this.rawMaterialTypeService.update(id, rawMaterialTypeData, userId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<any> {
        try {
            return await this.rawMaterialTypeService.remove(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
