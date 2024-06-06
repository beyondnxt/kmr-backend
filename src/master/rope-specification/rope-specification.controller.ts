import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CreateRopeSpecification } from './dto/rope-specification.dto';
import { RopeSpecification } from './entity/rope-specification.entity';
import { RopeSpecificationService } from './rope-specification.service';

@Controller('ropeSpecification')
export class RopeSpecificationController {
    constructor(
        private readonly ropeSpecificationService: RopeSpecificationService
    ) { }

    @Post()
    async create(@Body() ropeSpecificationData: CreateRopeSpecification, @Req() req: Request) {
        try {
            const userId = req.headers['userid']
            return await this.ropeSpecificationService.create(ropeSpecificationData, userId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10,
        @Query('value') customer: string): Promise<{ data: any[], totalCount: number }> {
        try {
            return await this.ropeSpecificationService.findAll(page, limit, customer);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<RopeSpecification> {
        try {
            return await this.ropeSpecificationService.findOne(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() ropeSpecificationData: CreateRopeSpecification, @Req() req: Request): Promise<RopeSpecification> {
        try {
            const userId = req.headers['userid']
            return await this.ropeSpecificationService.update(id, ropeSpecificationData, userId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<any> {
        try {
            return await this.ropeSpecificationService.remove(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
