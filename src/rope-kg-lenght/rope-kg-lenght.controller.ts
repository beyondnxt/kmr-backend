import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CreateRopeKgLenghtDto } from './dto/rope-kg-lenght.dto';
import { RopeKgLenght } from './entity/rope-kg-length.entity';
import { RopeKgLenghtService } from './rope-kg-lenght.service';

@Controller('ropeKgLenght')
export class RopeKgLenghtController {
    constructor(
        private readonly ropeKgLenghtService: RopeKgLenghtService
    ) { }

    @Post()
    async create(@Body() ropeKgLenghtData: CreateRopeKgLenghtDto, @Req() req: Request) {
        try {
            const userId = req.headers['userid']
            return await this.ropeKgLenghtService.create(ropeKgLenghtData, userId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10): Promise<{ data: RopeKgLenght[], totalCount: number }> {
        try {
            return await this.ropeKgLenghtService.findAll(page, limit);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<RopeKgLenght> {
        try {
            return await this.ropeKgLenghtService.findOne(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() ropeKgLenghtData: CreateRopeKgLenghtDto, @Req() req: Request): Promise<RopeKgLenght> {
        try {
            const userId = req.headers['userid']
            return await this.ropeKgLenghtService.update(id, ropeKgLenghtData, userId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<any> {
        try {
            return await this.ropeKgLenghtService.remove(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
