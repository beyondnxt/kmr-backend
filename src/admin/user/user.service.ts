import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Not, Repository } from "typeorm";
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
            .where('role.deleted = :deleted', { deleted: false })
            .leftJoinAndSelect('user.department', 'department')
            .leftJoinAndSelect('user.company', 'company', 'company.deleted = :deleted', { deleted: false })
            .andWhere('department.deleted = :deleted', { deleted: false })
            .andWhere('user.deleted = :deleted', { deleted: false })
            .orderBy('user.createdOn', 'DESC')
            .skip(skip)
            .take(limit);

        if (userName) {
            query = query.andWhere('user.userName = :userName', { userName });
        }

        if (fullName) {
            query = query.andWhere('user.fullName = :fullName', { fullName });
        }

        // const usersWithRoles = await query.getMany();

        const [usersWithRoles, totalCount] = await Promise.all([
            query.getMany(),
            query.getCount()
        ]);

        return {
            data: usersWithRoles.map(user => ({
                id: user.id,
                userName: user.userName,
                fullName: user.fullName,
                location: user ? user.location : null,
                locationName: user.company ? user.company.location : null,
                departmentId: user ? user.departmentId : null,
                departmentName: user.department ? user.department.departmentName : null,
                password: user.password,
                mobileNumer: user.mobileNumber,
                email: user.email,
                salesLeadName: user.salesLeadName,
                roleId: user.roleId,
                roleName: user.role.name,
                deleted: user.deleted,
                createdOn: user.createdOn,
                createdBy: user.createdBy,
                updatedOn: user.updatedOn,
                updatedBy: user.updatedBy
            })),
            total: totalCount
        };
    }

    async getUsers(): Promise<{ data: any[] }> {
        const users = await this.userRepository.find({ where: { deleted: false } });
        return {
            data: users.map(user => ({
                id: user.id,
                userName: user.userName
            })),
        };
    }

    async getsalesLeadName(): Promise<{ data: any[] }> {
        const users = await this.userRepository.find({
            where: {
                deleted: false,
                salesLeadName: Not(IsNull())
            },
        });
        return {
            data: users.map(user => ({
                id: user.id,
                salesLeadName: user.salesLeadName
            })),
        };
    }

    async getUserById(userId: number): Promise<User | undefined> {
        try {
            const user = this.userRepository.findOne({ where: { id: userId, deleted: false } });
            if (!user) {
                throw new NotFoundException('User not found');
            }
            return user;
        } catch (error) {
            throw new Error(`Unable to fetch User: ${error.message}`);
        }
    }

    async updateUser(id: number, userData: CreateUserDto): Promise<any> {
        const existingUser = await this.userRepository.findOne({ where: { id, deleted: false } });
        if (!existingUser) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        Object.assign(existingUser, userData);
        const userWithSameUsername = await this.userRepository.findOne({ where: { userName: userData.userName, id: Not(id), deleted: false } });
        if (userWithSameUsername) {
            throw new NotFoundException(`User name already exists`)
        }
        return await this.userRepository.save(existingUser);
    }

    async deleteUser(id: number): Promise<{ message: string }> {
        const user = await this.userRepository.findOne({ where: { id, deleted: false } });
        if (!user) {
            throw new NotFoundException('user not found');
        }
        user.deleted = true
        await this.userRepository.save(user);
        return { message: `Successfully deleted id ${id}` }
    }

}