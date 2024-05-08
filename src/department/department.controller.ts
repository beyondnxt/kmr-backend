import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query, Req } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { Department } from './entity/department.entity';
import { CreateDepartmentDto } from './dto/department.dto';

@Controller('department')
export class DepartmentController {
    constructor(
        private readonly departmentService: DepartmentService
    ) { }

    @Post()
    async create(@Body() departmentData: CreateDepartmentDto, @Req() req: Request) {
        try {
            const userId = req.headers['userid']
            return await this.departmentService.create(departmentData, userId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('value')departmentName: string): Promise<{ data: Department[], totalCount: number }> {
        try {
            return await this.departmentService.findAll(page, limit, departmentName);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Department> {
        try {
            const department = await this.departmentService.findOne(id);
            if (!department) {
                throw new NotFoundException('Department not found');
            }
            return department;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() departmentData: CreateDepartmentDto, @Req() req: Request): Promise<Department> {
        try {
            const userId = req.headers['userid']
            return await this.departmentService.update(id, departmentData, userId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<any> {
        try {
            return await this.departmentService.remove(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
