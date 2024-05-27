import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req } from '@nestjs/common';
import { Brand } from './entity/brand.entity';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/brand.dto';

@Controller('brand')
export class BrandController {
    constructor(
        private readonly brandService: BrandService
    ) { }

    @Post()
    async create(@Body() brandData: CreateBrandDto, @Req() req: Request) {
        try {
            const userId = req.headers['userid']
            return await this.brandService.create(brandData, userId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get()
    async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('value') name: string): Promise<{ data: Brand[], totalCount: number }> {
        try {
            return await this.brandService.findAll(page, limit, name);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Brand> {
        try {
            return await this.brandService.findOne(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() brandData: CreateBrandDto, @Req() req: Request): Promise<Brand> {
        try {
            const userId = req.headers['userid']
            return await this.brandService.update(id, brandData, userId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<any> {
        try {
            return await this.brandService.remove(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
