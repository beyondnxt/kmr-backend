import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query, Req } from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/color.dto';
import { Color } from './entity/color.entiry';

@Controller('color')
export class ColorController {
    constructor(
        private readonly colorService: ColorService
    ) { }

    @Post()
    async create(@Body() colorData: CreateColorDto, @Req() req: Request) {
        try {
            const userId = req.headers['userid']
            return await this.colorService.create(colorData, userId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async findAll(@Query('page') page: number | 'all' = 1, @Query('limit') limit: number = 10,
        @Query('value') colorName: string): Promise<{ data: Color[], totalCount: number }> {
        try {
            return await this.colorService.findAll(page, limit, colorName);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Color> {
        try {
            const color = await this.colorService.findOne(id);
            if (!color) {
                throw new NotFoundException('color not found');
            }
            return color;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() colorData: CreateColorDto, @Req() req: Request): Promise<Color> {
        try {
            const userId = req.headers['userid']
            return await this.colorService.update(id, colorData, userId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<any> {
        try {
            return await this.colorService.remove(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
