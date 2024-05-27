import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from './entity/company.entity';
import { CreateCompanyDto } from './dto/company.dto';

@Controller('company')
export class CompanyController {
    constructor(
        private readonly companyService: CompanyService
    ) { }

    @Post()
    async create(@Body() companyData: CreateCompanyDto, @Req() req: Request) {
        try {
            const userId = req.headers['userid']
            return await this.companyService.create(companyData, userId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get()
    async findAll(@Query('page') page: number | "all" = 1, @Query('limit') limit: number = 10, @Query('value') companyName: string): Promise<{ data: Company[], fetchedCount: number, totalCount: number }> {
        try {
            return await this.companyService.findAll(page, limit, companyName);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get('/all')
    async getCompanyName(): Promise<{ data: any[] }> {
        try {
            return await this.companyService.getCompanyName();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
    
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Company> {
        try {
            const Company = await this.companyService.findOne(id);
            if (!Company) {
                throw new NotFoundException('Company not found');
            }
            return Company;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() companyData: CreateCompanyDto, @Req() req: Request): Promise<Company> {
        try {
            const userId = req.headers['userid']
            return await this.companyService.update(id, companyData, userId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<any> {
        try {
            return await this.companyService.remove(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
