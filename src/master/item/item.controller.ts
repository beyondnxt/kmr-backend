import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CreateItemDto } from './dto/item.dto';
import { Item } from './entity/item.entity';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
    constructor(
        private readonly itemService: ItemService
    ) { }

    @Post()
    async createItem(
        @Body() createItemDto: CreateItemDto,
        @Req() req: Request,
    ) {
        try {
            const userId = req.headers['userid']
            return await this.itemService.create(createItemDto, userId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('value') ropeType: string): Promise<{ data: any[], totalCount: number }> {
        try {
            return await this.itemService.findAll(page, limit, ropeType);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get('/all')
    async getitemName(): Promise<{ data: any[] }> {
        try {
            return await this.itemService.getitemName();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Item> {
        try {
            return await this.itemService.findOne(id)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() itemData: CreateItemDto, @Req() req: Request): Promise<Item> {
        try {
            const userId = req.headers['userid']
            return await this.itemService.update(id, itemData, userId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<any> {
        try {
            return await this.itemService.remove(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
