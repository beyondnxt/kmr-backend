import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
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
import { RopeModule } from './rope/rope-type.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { RopeType } from './rope/entity/rope-type.entity';
import { Warehouse } from './warehouse/entity/warehouse.entity';
import { SupplierModule } from './supplier/supplier.module';
import { DepartmentModule } from './department/department.module';
import { ColorModule } from './color/color.module';
import { BrandModule } from './brand/brand.module';
import { Supplier } from './supplier/entity/supplier.entity';
import { Department } from './department/entity/department.entity';
import { Color } from './color/entity/color.entiry';
import { SalesLeadModule } from './sales-lead/sales-lead.module';
import { SalesLead } from './sales-lead/entity/sales-lead.entity';
import { ParentCategoryModule } from './parent-category/parent-category.module';
import { ParentCategory } from './parent-category/entity/parent-category.entity';
import { ChildCategoryModule } from './child-category/child-category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { ChildCategory } from './child-category/entity/child-category.entity';
import { SubCategory } from './sub-category/entity/sub-category.entity';
import { RawMaterialTypeModule } from './raw-material-type/raw-material-type.module';
import { RawMaterialType } from './raw-material-type/entity/raw-material-type.entity';
import { Brand } from './brand/entity/brand.entity';
import { RopeKgLenghtModule } from './rope-kg-lenght/rope-kg-lenght.module';
import { RopeGradeModule } from './rope-grade/rope-grade.module';
import { LocationModule } from './location/location.module';
import { RopeKgLenght } from './rope-kg-lenght/entity/rope-kg-length.entity';
import { RopeGrade } from './rope-grade/entity/rope-grade.entity';
import { AuthenticationMiddleware } from './common/middleware/authentication.middleware';

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
      entities: [User, Role, Company, MainCustomer, Customer, Category, RopeType, Warehouse, Supplier,
        Department, Color, SalesLead, ParentCategory, ChildCategory, SubCategory, RawMaterialType, Brand,
        RopeKgLenght, RopeGrade],
      synchronize: true,
    }),
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
    SalesLeadModule,
    ParentCategoryModule,
    ChildCategoryModule,
    SubCategoryModule,
    RawMaterialTypeModule,
    RopeKgLenghtModule,
    RopeGradeModule,
    LocationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RequestService,
  ],

})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).exclude(
      { path: 'auth/signup', method: RequestMethod.POST },
      { path: 'auth/signin', method: RequestMethod.POST },
      { path: 'auth/forgotPassword', method: RequestMethod.PUT },
      { path: 'auth/resetPasswordUsingId/:id', method: RequestMethod.PUT },
      { path: 'auth/email/changePassword', method: RequestMethod.POST },
      { path: 'products/getProductData', method: RequestMethod.GET }

    ).forRoutes('*');
  }
}
