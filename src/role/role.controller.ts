import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, HttpException, HttpStatus, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './entity/role.entity';
import { CreateRoleDto } from './dto/role.dto';


@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Get()
  async getAllRoles(@Query('page') page: number = 1, @Query('limit') limit: number = 10): Promise<{ data: Role[]; total: number }> {
    try {
      return await this.roleService.getAllRoles(page, limit);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getRoleById(@Param('id') id: number): Promise<Role> {
    try {
      const role = await this.roleService.getRoleById(id);
      if (!role) {
        throw new NotFoundException('Role not found');
      }
      return role;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createRole(@Body() roleData: CreateRoleDto): Promise<Role> {
    try {
      return await this.roleService.createRole(roleData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateRole(@Param('id') id: number, @Body() roleData: CreateRoleDto): Promise<Role> {
    try {
      const updatedRole = await this.roleService.updateRole(id, roleData);
      if (!updatedRole) {
        throw new NotFoundException('Role not found');
      }
      return updatedRole;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<any> {
    try {
      return await this.roleService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
