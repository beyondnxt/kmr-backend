import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestService } from './common/request.service';
import { AuthModule } from './admin/auth/auth.module';
import { Role } from './admin/role/entity/role.entity';
import { RoleModule } from './admin/role/role.module';
import { User } from './admin/user/entity/user.entity';
import { UserModule } from './admin/user/user.module';
import { AuthenticationMiddleware } from './common/middleware/authentication.middleware';
import { BrandModule } from './master/brand/brand.module';
import { Brand } from './master/brand/entity/brand.entity';
import { CategoryModule } from './master/category/category.module';
import { Category } from './master/category/entity/category.entity';
import { ChildCategoryModule } from './master/child-category/child-category.module';
import { ChildCategory } from './master/child-category/entity/child-category.entity';
import { ColorModule } from './master/color/color.module';
import { Color } from './master/color/entity/color.entiry';
import { CompanyModule } from './master/company/company.module';
import { Company } from './master/company/entity/company.entity';
import { CustomerModule } from './master/customer/customer.module';
import { Customer } from './master/customer/entity/customer.entity';
import { DepartmentModule } from './master/department/department.module';
import { Department } from './master/department/entity/department.entity';
import { MainCustomer } from './master/main-customer/entity/main-customer.entity';
import { MainCustomerModule } from './master/main-customer/main-customer.module';
import { ParentCategory } from './master/parent-category/entity/parent-category.entity';
import { ParentCategoryModule } from './master/parent-category/parent-category.module';
import { RawMaterialType } from './master/raw-material-type/entity/raw-material-type.entity';
import { RawMaterialTypeModule } from './master/raw-material-type/raw-material-type.module';
import { RopeGrade } from './master/rope-grade/entity/rope-grade.entity';
import { RopeGradeModule } from './master/rope-grade/rope-grade.module';
import { RopeKgLength } from './master/rope-kg-length/entity/rope-kg-length.entity';
import { RopeKgLenghtModule } from './master/rope-kg-length/rope-kg-length.module';
import { RopeType } from './master/rope/entity/rope-type.entity';
import { RopeModule } from './master/rope/rope-type.module';
import { SubCategory } from './master/sub-category/entity/sub-category.entity';
import { SubCategoryModule } from './master/sub-category/sub-category.module';
import { Supplier } from './master/supplier/entity/supplier.entity';
import { SupplierModule } from './master/supplier/supplier.module';
import { Warehouse } from './master/warehouse/entity/warehouse.entity';
import { WarehouseModule } from './master/warehouse/warehouse.module';
import { RopeSpecificationModule } from './master/rope-specification/rope-specification.module';
import { Extruder } from './master/extruder/entity/extruder.entity';
import { RopeMachine } from './master/rope-machine/entity/rope-machine.entity';
import { ExtruderModule } from './master/extruder/extruder.module';
import { Item } from './master/item/entity/item.entity';
import { ItemModule } from './master/item/item.module';
import { RopeDie } from './master/rope-die/entity/rope-die.entity';
import { RopeDieModule } from './master/rope-die/rope-die.module';
import { TwineType } from './master/twine-type/entity/twine-type.entity';
import { TwineTypeModule } from './master/twine-type/twine-type.module';
import { RopeSpecification } from './master/rope-specification/entity/rope-specification.entity';
import { RopeMachineModule } from './master/rope-machine/rope-machine.module';

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
        Department, Color, ParentCategory, ChildCategory, SubCategory, RawMaterialType, Brand,
        RopeKgLength, RopeGrade, Extruder, RopeMachine, Item, RopeDie, TwineType, RopeSpecification],
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
    // SalesLeadModule,
    ParentCategoryModule,
    ChildCategoryModule,
    SubCategoryModule,
    RawMaterialTypeModule,
    RopeKgLenghtModule,
    RopeGradeModule,
    RopeSpecificationModule,
    ExtruderModule,
    ItemModule,
    RopeDieModule,
    TwineTypeModule,
    RopeMachineModule
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
