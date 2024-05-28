import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CreateExtruderDto } from './dto/extruder.dto';
import { Extruder } from './entity/extruder.entity';
import { ExtruderService } from './extruder.service';

@Controller('extruder')
export class ExtruderController {
    constructor(
        private readonly extruderService: ExtruderService
    ) { }

    @Post()
    async create(@Body() extruderData: CreateExtruderDto, @Req() req: Request): Promise<Extruder> {
        try {
            const userId = req.headers['userid']
            return await this.extruderService.create(extruderData, userId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get()
    async findAll(@Query('page') page: number | "all" = 1, @Query('limit') limit: number = 10, @Query('value') companyName: string): Promise<{ data: any[], fetchedCount: number, totalCount: number }> {
        try {
            return await this.extruderService.findAll(page, limit, companyName);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Extruder> {
        try {
            return await this.extruderService.findOne(id)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() extruderData: CreateExtruderDto, @Req() req: Request): Promise<Extruder> {
        try {
            const userId = req.headers['userid']
            return await this.extruderService.update(id, extruderData, userId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<any> {
        try {
            return await this.extruderService.remove(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
