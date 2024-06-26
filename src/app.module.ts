import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestService } from './common/request.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { User } from './user/entity/user.entity';
import { Role } from './role/entity/role.entity';
import { CompanyModule } from './company/company.module';
import { Company } from './company/entity/company.entity';
import { MainCustomerModule } from './main-customer/main-customer.module';
import { CustomerModule } from './customer/customer.module';
import { MainCustomer } from './main-customer/entity/main-customer.entity';
import { AuthenticationMiddleware } from './common/middleware/authentication.middleware';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    // TypeOrmModule.forRoot({
    //   type: process.env.DB_TYPE,
    //   host: process.env.DB_HOST,
    //   port: parseInt(process.env.DB_PORT),
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_NAME,
    //   entities: [User, Role, Company, MainCustomer],
    //   synchronize: true,
    //   options: {
    //     encrypt: true,
    //     trustServerCertificate: true,
    //   },
    // }as any),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Role, Company, MainCustomer],
        synchronize: true,
        options: {
          encrypt: true, 
          trustServerCertificate: true, 
        },  
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    RoleModule,
    CompanyModule,
    MainCustomerModule,
    CustomerModule,
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
