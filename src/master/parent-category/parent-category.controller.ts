import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req } from '@nestjs/common';
import { ParentCategoryService } from './parent-category.service';
import { CreateParentCategoryDto } from './dto/parent-category.dto';
import { ParentCategory } from './entity/parent-category.entity';

@Controller('parent-category')
export class ParentCategoryController {
    constructor(
        private readonly parentCategoryService: ParentCategoryService
    ) { }

    @Post()
    async create(@Body() parentCategoryData: CreateParentCategoryDto, @Req() req: Request) {
        try {
            const userId = req.headers['userid']
            return await this.parentCategoryService.create(parentCategoryData, userId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10): Promise<{ data: ParentCategory[], totalCount: number }> {
        try {
            return await this.parentCategoryService.findAll(page, limit);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<ParentCategory> {
        try {
            return await this.parentCategoryService.findOne(id)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() parentCategoryData: CreateParentCategoryDto, @Req() req: Request): Promise<ParentCategory> {
        try {
            const userId = req.headers['userid']
            return await this.parentCategoryService.update(id, parentCategoryData, userId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<any> {
        try {
            return await this.parentCategoryService.remove(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
