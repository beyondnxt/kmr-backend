import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query, Req } from '@nestjs/common';
import { RopeService } from './rope.service';
import { Rope } from './entity/rope.entity';

@Controller('rope')
export class RopeController {
    constructor(private readonly ropeService: RopeService) { }

    @Get()
    async getAllRopes(@Query('page') page: number = 1, @Query('limit') limit: number = 10): Promise<{ ropes: Rope[]; total: number }> {
        try {
            return await this.ropeService.getAllRopes(page, limit);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async getRopeById(@Param('id') id: number): Promise<Rope> {
        try {
            return await this.ropeService.getRopeById(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    async createRope(@Body() ropeData: Rope, @Req() req: Request): Promise<Rope> {
        try {
            const userId = req.headers['userid']
            return await this.ropeService.createRope(ropeData, userId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    async updateRope(@Param('id') id: number, @Body() ropeData: Rope, @Req() req: Request): Promise<Rope> {
        try {
            const userId = req.headers['userid']
            const updatedRope = await this.ropeService.updateRope(id, ropeData, userId);
            if (!updatedRope) {
                throw new NotFoundException('Rope not found');
            }
            return updatedRope;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<any> {
        try {
            return await this.ropeService.remove(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
