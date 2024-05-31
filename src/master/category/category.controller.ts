import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entity/category.entity';
import { CreatecategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) { }

    @Post()
    async create(@Body() categoryData: CreatecategoryDto, @Req() req: Request) {
        try {
            const userId = req.headers['userid']
            return await this.categoryService.create(categoryData, userId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get()
    async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10,
    @Query('value') name: string): Promise<{ data: Category[], totalCount: number }> {
        try {
            return await this.categoryService.findAll(page, limit, name);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get('/all')
    async getCategoryName(): Promise<{ data: any[] }> {
        try {
            return await this.categoryService.getCategoryName();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Category> {
        try {
            const Category = await this.categoryService.findOne(id);
            if (!Category) {
                throw new NotFoundException('Category not found');
            }
            return Category;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() categoryData: CreatecategoryDto, @Req() req: Request): Promise<Category> {
        try {
            const userId = req.headers['userid']
            return await this.categoryService.update(id, categoryData, userId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<any> {
        try {
            return await this.categoryService.remove(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
