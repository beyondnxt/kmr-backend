import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { Role } from './role/entity/role.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '192.168.0.2',
      port: 1433,
      username: 'kmruser',
      password: 'kmr@123',
      database: 'kmr',
      entities: [User, Role],
      synchronize: true,
      options: {
        encrypt: false, // Use SSL
      },

    }),
    AuthModule, 
    UserModule, 
    RoleModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
