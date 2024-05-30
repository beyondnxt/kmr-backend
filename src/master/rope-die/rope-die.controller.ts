import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CreateRopeDieDto } from './dto/rope-die.dto';
import { RopeDie } from './entity/rope-die.entity';
import { RopeDieService } from './rope-die.service';

@Controller('ropeDie')
export class RopeDieController {
    constructor(
        private readonly ropeDieService: RopeDieService
    ) { }

    @Post()
    async create(@Body() ropeDieData: CreateRopeDieDto, @Req() req: Request) {
        try {
            const userId = req.headers['userid']
            return await this.ropeDieService.create(ropeDieData, userId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async findAll(@Query('page') page: number | 'all' = 1, @Query('limit') limit: number = 10): Promise<{ data: any[], fetchedCount: number, totalCount: number }> {
        try {
            return await this.ropeDieService.findAll(page, limit)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<RopeDie> {
        try {
            return await this.ropeDieService.findOne(id)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() ropeDieData: CreateRopeDieDto, @Req() req: Request): Promise<RopeDie> {
        try {
            const userId = req.headers['userid']
            return await this.ropeDieService.update(id, ropeDieData, userId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<any> {
        try {
            return await this.ropeDieService.remove(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
