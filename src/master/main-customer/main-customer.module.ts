import { Module } from '@nestjs/common';
import { MainCustomerService } from './main-customer.service';
import { MainCustomerController } from './main-customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainCustomer } from './entity/main-customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MainCustomer])],
  providers: [MainCustomerService],
  controllers: [MainCustomerController]
})
export class MainCustomerModule {}
