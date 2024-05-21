import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CreateRopeKgLengthDto } from './dto/rope-kg-length.dto';
import { RopeKgLength } from './entity/rope-kg-length.entity';
import { RopeKgLengthService } from './rope-kg-length.service';
@Controller('ropeKgLength')
export class RopeKgLengthController {
    constructor(
        private readonly ropeKgLengthService: RopeKgLengthService
    ) { }

    @Post()
    async create(@Body() ropeKgLengthData: CreateRopeKgLengthDto, @Req() req: Request) {
        try {
            const userId = req.headers['userid']
            return await this.ropeKgLengthService.create(ropeKgLengthData, userId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10): Promise<{ data: any[], totalCount: number }> {
        try {
            return await this.ropeKgLengthService.findAll(page, limit);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<RopeKgLength> {
        try {
            return await this.ropeKgLengthService.findOne(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() ropeKgLengthData: CreateRopeKgLengthDto, @Req() req: Request): Promise<RopeKgLength> {
        try {
            const userId = req.headers['userid']
            return await this.ropeKgLengthService.update(id, ropeKgLengthData, userId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<any> {
        try {
            return await this.ropeKgLengthService.remove(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
