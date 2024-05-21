// import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req } from '@nestjs/common';
// import { SalesLeadService } from './sales-lead.service';
// import { CreateSalesLeadDto } from './dto/sales-lead.dto';
// import { SalesLead } from './entity/sales-lead.entity';

// @Controller('saleslead')
// export class SalesLeadController {
//     constructor(
//         private readonly salesLeadService: SalesLeadService
//     ) { }

//     @Post()
//     async create(@Body() salesLeadData: CreateSalesLeadDto, @Req() req: Request) {
//         try {
//             const userId = req.headers['userid']
//             return await this.salesLeadService.create(salesLeadData, userId)
//         } catch (error) {
//             throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }

//     @Get()
//     async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('value') name: string): Promise<{ data: any[], totalCount: number }> {
//         try {
//             return await this.salesLeadService.findAll(page, limit, name);
//         } catch (error) {
//             throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }

//     @Get('/all')
//     async getSalesLeadName(): Promise<{ data: any[] }> {
//         try {
//             return await this.salesLeadService.getSalesLeadName();
//         } catch (error) {
//             throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }

//     @Get(':id')
//     async findOne(@Param('id') id: number): Promise<SalesLead> {
//         try {
//             return await this.salesLeadService.findOne(id)
//         } catch (error) {
//             throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }

//     @Put(':id')
//     async update(@Param('id') id: number, @Body() salesLeadData: CreateSalesLeadDto, @Req() req: Request): Promise<SalesLead> {
//         try {
//             const userId = req.headers['userid']
//             return await this.salesLeadService.update(id, salesLeadData, userId);
//         } catch (error) {
//             throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }

//     @Delete(':id')
//     async remove(@Param('id') id: number): Promise<any> {
//         try {
//             return await this.salesLeadService.remove(id);
//         } catch (error) {
//             throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
// }
