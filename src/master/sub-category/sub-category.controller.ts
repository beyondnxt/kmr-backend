import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/sub-category.dto';
import { SubCategory } from './entity/sub-category.entity';
import { SubCategoryService } from './sub-category.service';

@Controller('subcategory')
export class SubCategoryController {
    constructor(
        private readonly subCategoryService: SubCategoryService
    ) { }

    @Post()
    async create(@Body() subCategoryData: CreateSubCategoryDto, @Req() req: Request) {
        try {
            const userId = req.headers['userid']
            return await this.subCategoryService.create(subCategoryData, userId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async findAll(@Query('page') page: number | "all" = 1, @Query('limit') limit: number = 10, @Query('value') name: string): Promise<{ data: SubCategory[], fetchedCount: number, totalCount: number }> {
        try {
            return await this.subCategoryService.findAll(page, limit, name);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get('/all')
    async getSubCategoryName(): Promise<{ data: any[] }> {
        try {
            return await this.subCategoryService.getSubCategoryName();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<SubCategory> {
        try {
            return await this.subCategoryService.findOne(id)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() subCategoryData: CreateSubCategoryDto, @Req() req: Request): Promise<SubCategory> {
        try {
            const userId = req.headers['userid']
            return await this.subCategoryService.update(id, subCategoryData, userId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<any> {
        try {
            return await this.subCategoryService.remove(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
