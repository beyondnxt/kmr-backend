import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Role } from '../role/entity/role.entity';
import { User } from '../user/entity/user.entity';

// @Module({
//   imports: [
//     // ConfigModule.forRoot(),
//     PassportModule.register({ defaultStrategy: 'jwt' }),
//     JwtModule.register({
//       secret: process.env.JWT_SECRET,
//       signOptions: { expiresIn: '1h' },
//     }),
//     TypeOrmModule.forFeature([User, Role]),
//   ],
//   providers: [AuthService],
//   controllers: [AuthController],
// })

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      secret: config.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: config.get<string | number>('JWT_EXPIRES') },
    }),
  }),
  TypeOrmModule.forFeature([User, Role])],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}

