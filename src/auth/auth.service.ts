import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
// import { CreateUserDto, userCreated } from 'src/user/dto/user.dto';
import * as nodemailer from 'nodemailer';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>, private readonly jwtService: JwtService
    ) { }

    async signUp(signUpDto: CreateUserDto): Promise<any> {
        const { userName, fullName, location, departmentId, password, mobileNumber, email, roleId, status } = signUpDto;
        const existingUser = await this.userRepository.findOne({ where: { userName } });
        if (existingUser) {
            throw new UnauthorizedException('userName already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userRepository.create({
            userName,
            fullName,
            location,
            departmentId,
            password: hashedPassword,
            mobileNumber: mobileNumber.toString(),
            email,
            roleId,
            status
        });
        await this.userRepository.save(user);
        const token = this.jwtService.sign({ id: user.id });

        return { token };
    }

    async signIn(signInDto: CreateUserDto): Promise<any> {
        const { userName, password } = signInDto;
        if (!userName || !password) {
            return { message: 'User name and password required' }
        }
        const user = await this.userRepository.findOne({ where: { userName }, relations: ['role'] })

        if (!user) {
            return { message: 'Invalid user name or password' };
        }

        if (user.status !== true) {
            return { message: 'User is not active' };
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return { message: 'Invalid user name or password' };
        }
        const token = this.jwtService.sign({ id: user.id });
        const userData = { userId: user.id, userName: user.userName, roleId: user.roleId, roleName: user.role.name, token: token }
        return userData;
    }

    async getUserInfo(id: number): Promise<any> {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .select(['user.id', 'user.userName', 'user.fullName', 'user.location', 'user.departmentId', 'user.mobileNumber', 'user.email', 'user.roleId', 'user.status'])
            .where('user.id = :id', { id })
            .getOne();

        if (!user) {
            throw new NotFoundException(`User id ${id} not found`);
        }
        return user;
    }

    async changePassword(id: number, password: string) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await this.userRepository.update(id, { password: hashedPassword });
            if (!result) {
                throw new NotFoundException('User not found');
            }
            return await this.userRepository.findOne({ where: { id } });
        } catch (error) {
            console.error('Error changing password:', error);
            throw new InternalServerErrorException('Failed to change password');
        }
    }

    async forgotPassword(userName: string, newPassword: string): Promise<User> {
        const existingUser = await this.userRepository.findOne({ where: { userName } });
        if (!existingUser) {
            throw new NotFoundException('Invalid user name');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        existingUser.password = hashedPassword;
        return await this.userRepository.save(existingUser);
    }

    async resetPasswordUsingId(id: number, password: string): Promise<any> {
        try {
            const user = await this.changePassword(id, password);
            return user;
        } catch (error) {
            throw new InternalServerErrorException('Failed to reset password');
        }
    }

    async sendEmailForgotPassword(email: string): Promise<boolean> {
        try {
            const user = await this.userRepository.findOne({ where: { email } });
            if (!user) {
                throw new NotFoundException('User not found');
            }

            const transporter = nodemailer.createTransport({
                host: process.env.HOST,
                port: parseInt(process.env.PORT),
                secure: process.env.SECURE === 'true', // Convert string to boolean
                auth: {
                    user: process.env.USER,
                    pass: process.env.PASSWORD
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            const mailOptions = {
                from: 'jishajini21@gmail.com',
                to: email,
                subject: 'Forgotten Password',
                text: 'Forgot Password',
                html: `Hi!<br><br>If you requested to reset your password, click <a href="http://localhost:4200/change-password/${user.id}">here</a>`
            };

            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);
            return true;
        } catch (error) {
            console.error('Error sending email:', error);
            throw new InternalServerErrorException('Failed to send email');
        }
    }
}
