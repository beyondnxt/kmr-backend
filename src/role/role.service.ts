import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entity/role.entity';
import { CreateRoleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) { }

  async createRole(roleData: CreateRoleDto): Promise<Role> {
    try {
      const role = this.roleRepository.create(roleData);
      return await this.roleRepository.save(role);
    } catch (error) {
      throw new Error(`Unable to create role : ${error.message}`);
    }
  }

  async getAllRoles(page: number = 1, limit: number = 10): Promise<{ data: Role[]; total: number }> {
    try {
      const [data, total] = await this.roleRepository.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
      });
      return { data, total };
    } catch (error) {
      throw new Error(`Unable to fetch roles: ${error.message}`);
    }
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

  async updateRole(id: number, roleData: CreateRoleDto): Promise<Role> {
    try {
      const role = await this.roleRepository.findOne({ where: { id } });
      if (!role) {
        throw new NotFoundException(`Role with ID ${id} not found`);
      }
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

}
