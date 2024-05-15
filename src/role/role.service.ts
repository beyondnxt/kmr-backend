import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Like, Repository } from 'typeorm';
import { Role } from './entity/role.entity';
import { CreateRoleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly connection: Connection
  ) { }

  async createRole(roleData: CreateRoleDto, userId: number): Promise<Role> {
    try {
      const role = this.roleRepository.create(roleData);
      role.createdBy = userId
      return await this.roleRepository.save(role);
    } catch (error) {
      throw new Error(`Unable to create role : ${error.message}`);
    }
  }

  async getAllRoles(page: number | 'all' = 1, limit: number = 10, name: string): Promise<{ data: any[]; fetchedCount: number, totalCount: number }> {
    const where: any = {};
    if (name) {
      where.name = Like(`%${name}%`);
    }
    let queryBuilder = this.roleRepository.createQueryBuilder('role')
      .andWhere(where);

    if (page !== "all") {
      const skip = (page - 1) * limit;
      queryBuilder = queryBuilder.skip(skip).take(limit);
    }

    const [role, totalCount] = await Promise.all([
      queryBuilder.getMany(),
      queryBuilder.getCount()
    ]);
    return {
      data: role.map(role => ({
        id: role.id,
        name: role.name,
        description: role.description,
        menuAccess: role.menuAccess,
        createdBy: role.createdBy,
        createdOn: role.createdOn,
        updatedBy: role.updatedBy,
        updatedOn: role.updatedOn
      })),
      fetchedCount: role.length,
      totalCount: totalCount
    };
  }

  async getRoleName(): Promise<{ data: any[] }> {
    const role = await this.roleRepository.find();
    return {
      data: role.map(role => ({
        id: role.id,
        roleName: role.name
      })),
    };
  }

  async getRoleById(id: number): Promise<Role> {
    try {
      return await this.roleRepository.findOne({ where: { id } });
    } catch (error) {
      throw new Error(`Unable to fetch role: ${error.message}`);
    }
  }

  async updateRole(id: number, roleData: CreateRoleDto, userId: number): Promise<Role> {
    try {
      const role = await this.roleRepository.findOne({ where: { id } });
      if (!role) {
        throw new NotFoundException(`Role with ID ${id} not found`);
      }
      role.updatedBy = userId
      this.roleRepository.merge(role, roleData);
      return await this.roleRepository.save(role);
    } catch (error) {
      throw new Error(`Unable to update role : ${error.message}`);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const role = await this.roleRepository.findOne({ where: { id } });
      if (!role) {
        throw new NotFoundException(`Role with ID ${id} not found`);
      }
      await this.roleRepository.remove(role);
    } catch (error) {
      throw new Error(`Unable to delete role: ${error.message}`);
    }
  }

  async getmodules(): Promise<{ data: any }> {
    const query = "SELECT * FROM kmr.modules"; // Your SQL query
    const result = await this.connection.query(query);
    return {
      data: result.map(result => ({
        id: result.id,
        name: result.name,
        key: result.key,
        sort: result.sort === 0 ? false : true,
        role: result.role === 0 ? false : true
      }))
    };
  }

}
