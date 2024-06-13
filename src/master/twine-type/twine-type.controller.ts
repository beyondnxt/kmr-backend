import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CreateTwineTypeDto } from './dto/twine-type.dto';
import { TwineType } from './entity/twine-type.entity';
import { TwineTypeService } from './twine-type.service';

@Controller('twineType')
export class TwineTypeController {
    constructor(private readonly twineTypeService: TwineTypeService) { }

    @Get()
    async getAlltwineTypes(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('value') name: string): Promise<{ data: any[]; fetchedCount: number, totalCount: number }> {
        try {
            return await this.twineTypeService.getAlltwineTypes(page, limit, name);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get('/all')
    async getTwineTypeName(): Promise<{ data: any[] }> {
        try {
            return await this.twineTypeService.getTwineTypeName();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get(':id')
    async getTwineTypeById(@Param('id') id: number): Promise<TwineType> {
        try {
            return await this.twineTypeService.getTwineTypeById(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Post()
    async createTwineType(@Body() twinTypeData: CreateTwineTypeDto, @Req() req: Request): Promise<TwineType> {
        try {
            const userId = req.headers['userid']
            return await this.twineTypeService.createTwineType(twinTypeData, userId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Put(':id')
    async updatetwineType(@Param('id') id: number, @Body() twinTypeData: CreateTwineTypeDto, @Req() req: Request): Promise<TwineType> {
        try {
            const userId = req.headers['userid']
            return await this.twineTypeService.updatetwineType(id, twinTypeData, userId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<any> {
        try {
            return await this.twineTypeService.remove(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
