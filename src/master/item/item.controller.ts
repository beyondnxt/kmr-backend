import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateItemDto } from './dto/item.dto';
import { Item } from './entity/item.entity';
import { ItemService } from './item.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/multer.config';

@Controller('item')
export class ItemController {
    constructor(
        private readonly itemService: ItemService
    ) { }

    @Post()
    @UseInterceptors(FileInterceptor('itemImage', multerConfig))
    async createItem(
        @UploadedFile() file: Express.Multer.File,
        @Body() createItemDto: CreateItemDto,
        @Req() req: Request,
    ) {
        try {
            const userId = req.headers['userid'] as string;
            const imagePath = file ? file.path : null;
            createItemDto.itemImage = imagePath;
            return await this.itemService.create(createItemDto, parseInt(userId, 10));
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('value') itemName: string): Promise<{ data: any[], totalCount: number }> {
        try {
            return await this.itemService.findAll(page, limit, itemName);
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
