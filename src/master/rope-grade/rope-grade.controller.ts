import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req } from '@nestjs/common';
import { RopeGradeService } from './rope-grade.service';
import { CreateRopeGradeDto } from './dto/rope-grade.dto';
import { RopeGrade } from './entity/rope-grade.entity';

@Controller('ropeGrade')
export class RopeGradeController {
    constructor(
        private readonly ropeGradeService: RopeGradeService
    ) { }

    @Post()
    async create(@Body() ropeGradeData: CreateRopeGradeDto, @Req() req: Request) {
        try {
            const userId = req.headers['userid']
            return await this.ropeGradeService.create(ropeGradeData, userId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async findAll(@Query('page') page: number | 'all' = 1, @Query('limit') limit: number = 10,
    @Query('value') ropeTypeName: string): Promise<{ data: any[], fetchedCount: number, totalCount: number }> {
        return await this.ropeGradeService.findAll(page, limit, ropeTypeName)
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<RopeGrade> {
        try {
            return await this.ropeGradeService.findOne(id)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() ropeGradeData: CreateRopeGradeDto, @Req() req: Request): Promise<RopeGrade> {
      try {
        const userId = req.headers['userid']
        return await this.ropeGradeService.update(id, ropeGradeData, userId);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
    }
  
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<any> {
      try {
        return await this.ropeGradeService.remove(id);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
    }

}
