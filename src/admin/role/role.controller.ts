import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, HttpException, HttpStatus, Query, Req } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './entity/role.entity';
import { CreateRoleDto } from './dto/role.dto';


@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Get('module')
  async getmodules(): Promise<any> {
    const module = await this.roleService.getmodules()
    return module
  }

  @Get()
  async getAllRoles(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('name') name: string): Promise<{ data: Role[]; fetchedCount: number, totalCount: number }> {
    try {
      return await this.roleService.getAllRoles(page, limit, name);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/all')
  async getRoleName(): Promise<{ data: any[] }> {
    try {
      return await this.roleService.getRoleName();
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
  async createRole(@Body() roleData: CreateRoleDto, @Req() req: Request): Promise<Role> {
    try {
      const userId = req.headers['userid']
      return await this.roleService.createRole(roleData, userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateRole(@Param('id') id: number, @Body() roleData: CreateRoleDto, @Req() req: Request): Promise<Role> {
    try {
      const userId = req.headers['userid']
      return await this.roleService.updateRole(id, roleData, userId);
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
