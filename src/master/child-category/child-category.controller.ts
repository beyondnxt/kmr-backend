import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req } from '@nestjs/common';
import { ChildCategoryService } from './child-category.service';
import { CreateChildCategoryDto } from './dto/child-category.dto';
import { ChildCategory } from './entity/child-category.entity';

@Controller('childCategory')
export class ChildCategoryController {
    constructor(
        private readonly childCategoryService: ChildCategoryService
    ) { }

    @Post()
    async create(@Body() childCategoryData: CreateChildCategoryDto, @Req() req: Request) {
        try {
            const userId = req.headers['userid']
            return await this.childCategoryService.create(childCategoryData, userId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async findAll(@Query('page') page: number | "all" = 1, @Query('limit') limit: number = 10, @Query('value') name: string): Promise<{ data: ChildCategory[], fetchedCount: number, totalCount: number }> {
        try {
            return await this.childCategoryService.findAll(page, limit, name);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<ChildCategory> {
        try {
            return await this.childCategoryService.findOne(id)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() childCategoryData: CreateChildCategoryDto, @Req() req: Request): Promise<ChildCategory> {
        try {
            const userId = req.headers['userid']
            return await this.childCategoryService.update(id, childCategoryData, userId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<any> {
        try {
            return await this.childCategoryService.remove(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
