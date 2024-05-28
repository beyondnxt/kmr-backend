import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CreateRopeMachineDto } from './dto/rope-machine.dto';
import { RopeMachineService } from './rope-machine.service';
import { RopeMachine } from './entity/rope-machine.entity';

@Controller('ropeMachine')
export class RopeMachineController {
    constructor(
        private readonly ropeMachineService: RopeMachineService
    ) { }

    @Post()
    async create(@Body() ropeMachineData: CreateRopeMachineDto, @Req() req: Request) {
        try {
            const userId = req.headers['userid']
            return await this.ropeMachineService.create(ropeMachineData, userId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10,
        @Query('value') machineName: string): Promise<{ data: any[], totalCount: number }> {
        try {
            return await this.ropeMachineService.findAll(page, limit, machineName);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<RopeMachine> {
        try {
            return await this.ropeMachineService.findOne(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() ropeMachineData: CreateRopeMachineDto, @Req() req: Request): Promise<RopeMachine> {
        try {
            const userId = req.headers['userid']
            return await this.ropeMachineService.update(id, ropeMachineData, userId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<any> {
        try {
            return await this.ropeMachineService.remove(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
