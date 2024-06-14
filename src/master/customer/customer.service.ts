import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entity/customer.entity';
import { Like, Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/customer.dto';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as csv from 'csv-parser';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>
    ) { }

    async create(customerData: CreateCustomerDto, userId: number): Promise<Customer> {
        const Customer = this.customerRepository.create(customerData);
        Customer.createdBy = userId
        return await this.customerRepository.save(Customer);
    }

    async findAll(page: number | 'all' = 1, limit: number = 10, name: string): Promise<{ data: any[], fetchedCount: number, totalCount: number }> {
        const where: any = {};
        if (name) {
            where.name = Like(`%${name}%`);
        }
        let queryBuilder = this.customerRepository.createQueryBuilder('customer')
            .where('customer.deleted = :deleted', { deleted: false })
            .leftJoinAndSelect('customer.mainCustomer', 'mainCustomer')
            .where('mainCustomer.deleted = :deleted', { deleted: false })
            .leftJoinAndSelect('customer.user', 'user')
            .where('user.deleted = :deleted', { deleted: false })
            .andWhere(where);

        if (page !== "all") {
            const skip = (page - 1) * limit;
            queryBuilder = queryBuilder.skip(skip).take(limit);
        }

        const [customer, totalCount] = await Promise.all([
            queryBuilder.getMany(),
            queryBuilder.getCount()
        ]);
        return {
            data: customer.map(customer => ({
                id: customer.id,
                mainCustomerId: customer.mainCustomerId,
                mainCustomerName: customer.mainCustomer.name,
                status: customer.status,
                name: customer.name,
                code: customer.code,
                type: customer.type,
                contactPerson: customer.contactPerson,
                contactNo: customer.contactNo,
                stdCode: customer.stdCode,
                email: customer.email,
                grade: customer.grade,
                salesLeadId: customer.salesLeadId,
                salesLeadName: customer.user.salesLeadName,
                salesCode: customer.salesCode,
                destinationPort: customer.destinationPort,
                finalDestination: customer.finalDestination,
                pieceWeightTolerance: customer.pieceWeightTolerance,
                invoiceTolerance: customer.invoiceTolerance,
                state: customer.state,
                gstIn: customer.gstIn,
                aadhaarNumber: customer.aadhaarNumber,
                pan: customer.pan,
                country: customer.country,
                lookupSLID: customer.lookupSLID,
                address: customer.address,
                deleted: customer.deleted,
                createdBy: customer.createdBy,
                createdOn: customer.createdOn,
                updatedBy: customer.updatedBy,
                updatedOn: customer.updatedOn
            })),
            fetchedCount: customer.length,
            totalCount: totalCount
        };
    }

    async findOne(id: number): Promise<Customer> {
        const Customer = await this.customerRepository.findOne({ where: { id, deleted: false } });
        if (!Customer) {
            throw new NotFoundException('Customer not found');
        }
        return Customer;
    }

    async update(id: number, customerData: CreateCustomerDto, userId): Promise<Customer> {
        try {
            const Customer = await this.customerRepository.findOne({ where: { id, deleted: false } });
            if (!Customer) {
                throw new NotFoundException(`Customer with ID ${id} not found`);
            }
            Customer.updatedBy = userId
            Object.assign(Customer, customerData);
            return await this.customerRepository.save(Customer);
        } catch (error) {
            throw new Error(`Unable to update Customer : ${error.message}`);
        }
    }

    async remove(id: number): Promise<any> {
        const customer = await this.customerRepository.findOne({ where: { id, deleted: false } });
        if (!customer) {
            throw new NotFoundException('customer not found');
        }
        customer.deleted = true
        await this.customerRepository.save(customer);
        return { message: `Successfully deleted id ${id}` }
    }

    async uploadCustomers(file: Express.Multer.File): Promise<string> {
        try {
            // Step 1: Read the Excel file
            const workbook = XLSX.read(file.buffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            XLSX.utils.sheet_to_json(worksheet);

            // Step 2: Convert JSON to CSV format
            const csvData = XLSX.utils.sheet_to_csv(worksheet);

            // Step 3: Save CSV data to a temporary file
            const tempCSVFilePath = 'temp.csv';
            fs.writeFileSync(tempCSVFilePath, csvData);

            // Step 4: Parse CSV file and upload data to the database
            const customers: Customer[] = [];
            fs.createReadStream(tempCSVFilePath)
                .pipe(csv())
                .on('data', (row) => {
                    const customer = new Customer();
                    customer.name = row['Name'] ?? null;
                    customer.code = row['Code'] ?? null;
                    customer.type = row['Type'] ?? null;
                    customer.address = row['Address'] ?? null;
                    customer.contactNo = row['ContactNumber'] ?? null;
                    customer.stdCode = row['STDCode'] ?? null;
                    customer.contactPerson = row['ContactPerson'] ?? null;
                    customer.email = row['EmailID'] ?? null;
                    customer.grade = row['Grade'] ?? null;
                    customer.salesLeadId = row['SalesLeadNameID'] ? Number(row['SalesLeadNameID']) || null : null;
                    customer.salesCode = row['SalesCode'] ?? null;
                    customer.mainCustomerId = row['MainCustomerID'] ? Number(row['MainCustomerID']) || null : null;
                    customer.destinationPort = row['DestinationPort'] ?? null;
                    customer.finalDestination = row['FinalDestination'] ?? null;
                    customer.pieceWeightTolerance = row['PieceWeightTolerance'] ?? null;
                    customer.invoiceTolerance = row['InvoiceTolerance'] ?? null;
                    customer.state = row['StateName'] ?? null;
                    customer.gstIn = row['GSTIN'] ?? null;
                    customer.status = row['ActiveStatus'] ?? null;
                    customer.country = row['CountryName'] ?? null;
                    customer.aadhaarNumber = row['AadhaarNumber'] ? Number(row['AadhaarNumber']) || null : null;
                    customer.pan = row['PAN'] ? Number(row['PAN']) || null : null;
                    customer.lookupSLID = row['LookupSLID'] ?? null;
                    customer.deleted = row['deleted'] === 'false';
                    customer.createdBy = row['CreatedBy'] ? Number(row['CreatedBy']) || null : null;
                    customer.updatedBy = row['ModifiedBy'] ? Number(row['ModifiedBy']) || null : null;
                    customer.createdOn = row['CreatedOn'] ? new Date(row['CreatedOn']) : new Date();
                    customer.updatedOn = row['ModifiedOn'] ? new Date(row['UpdatedOn']) : new Date();

                    customers.push(customer);
                })
                .on('end', async () => {
                    // Step 5: Upload data to the database
                    await this.customerRepository.save(customers);
                    console.log('Customers saved successfully');
                    // Remove temporary CSV file
                    fs.unlinkSync(tempCSVFilePath);
                });

            return 'success'
        } catch (error) {
            console.error('Error uploading customers:', error);
            return 'error';
        }
    }
}
