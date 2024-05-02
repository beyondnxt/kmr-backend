import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestService } from './common/request.service';
import { User } from './user/entity/user.entity';
import { Role } from './role/entity/role.entity';
import { CompanyModule } from './company/company.module';
import { Company } from './company/entity/company.entity';
import { MainCustomerModule } from './main-customer/main-customer.module';
import { CustomerModule } from './customer/customer.module';
import { MainCustomer } from './main-customer/entity/main-customer.entity';
import { Customer } from './customer/entity/customer.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entity/category.entity';
import { RopeModule } from './rope/rope.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { Rope } from './rope/entity/rope.entity';
import { Warehouse } from './warehouse/entity/warehouse.entity';
import { SupplierModule } from './supplier/supplier.module';
import { DepartmentModule } from './department/department.module';
import { ColorModule } from './color/color.module';
import { BrandModule } from './brand/brand.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Role, Company, MainCustomer, Customer, Category, Rope, Warehouse],
      synchronize: false,
    }),

    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'mysql',
    //     host: configService.get('DB_HOST'),
    //     port: +configService.get('DB_PORT'),
    //     username: configService.get('DB_USERNAME'),
    //     password: configService.get('DB_PASSWORD'),
    //     database: configService.get('DB_NAME'),
    //     entities: [User, Role, Company, MainCustomer],
    //     synchronize: false,
    //     options: {
    //       encrypt: true,
    //       trustServerCertificate: true,
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
    AuthModule,
    UserModule,
    RoleModule,
    CompanyModule,
    MainCustomerModule,
    CustomerModule,
    CategoryModule,
    RopeModule,
    WarehouseModule,
    SupplierModule,
    DepartmentModule,
    ColorModule,
    BrandModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RequestService,
  ],

})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(AuthenticationMiddleware).exclude(
  //     { path: 'auth/signup', method: RequestMethod.POST },
  //     { path: 'auth/signin', method: RequestMethod.POST },
  //     { path: 'auth/forgotPassword', method: RequestMethod.PUT },
  //     { path: 'auth/resetPasswordUsingId/:id', method: RequestMethod.PUT },
  //     { path: 'auth/email/changePassword', method: RequestMethod.POST },
  //     { path: 'products/getProductData', method: RequestMethod.GET }

  //   ).forRoutes('*');
  // }
}
