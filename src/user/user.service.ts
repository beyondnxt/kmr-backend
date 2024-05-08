import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { CreateUserDto } from "./dto/user.dto";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>
    ) { }

    async doesUserExist(userId: any) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        return user;
    }

    async getUsersWithRoles(page: number = 1, limit: number = 10, userName?: string, fullName?: string): Promise<{ data: any[], total: number }> {
        const skip = (page - 1) * limit;

        let query = this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.role', 'role')
            .leftJoinAndSelect('user.department', 'department')
            .skip(skip)
            .take(limit);

        if (userName) {
            query = query.andWhere('user.userName = :userName', { userName });
        }

        if (fullName) {
            query = query.andWhere('user.fullName = :fullName', { fullName });
        }

        const usersWithRoles = await query.getMany();

        const totalCount = await this.userRepository.createQueryBuilder('user').getCount();

        return {
            data: usersWithRoles.map(user => ({
                id: user.id,
                userName: user.userName,
                fullName: user.fullName,
                location: user.location,
                departmentId: user.departmentId?user.departmentId: null,
                departmentName: user.department.departmentName? user.department.departmentName: null,
                password: user.password,
                mobileNumer: user.mobileNumer,
                email: user.email,
                roleId: user.roleId,
                roleName: user.role.name,
                createdOn: user.createdOn
            })),
            total: totalCount
        };
    }

    async getUsers(page: number = 1, limit: number = 10): Promise<{ data: User[]; total: number }> {
        try {
            const [data, total] = await this.userRepository.findAndCount({
                take: limit,
                skip: (page - 1) * limit,
            });
            return { data, total };
        } catch (error) {
            throw new Error(`Unable to fetch users: ${error.message}`);
        }
    }

    async getUserById(userId: number): Promise<User | undefined> {
        try {
            const user = this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new NotFoundException('User not found');
            }
            return user;
        } catch (error) {
            throw new Error(`Unable to fetch User: ${error.message}`);
        }
    }

    async updateUser(id: number, userData: CreateUserDto): Promise<User> {
        const existingUser = await this.userRepository.findOne({ where: { id } });
        if (!existingUser) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        Object.assign(existingUser, userData);
        return await this.userRepository.save(existingUser);
    }

    async deleteUser(id: number): Promise<{ message: string }> {
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return { message: `Successfully deleted id ${id}` };
    }

}