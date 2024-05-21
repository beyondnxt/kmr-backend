import { Controller, Get, Param, NotFoundException, Delete, Put, Body, HttpException, HttpStatus, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/user.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/all')
  async getUsers(): Promise<{ data: User[] }> {
    try {
      return await this.userService.getUsers();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/salesLeadName')
  async getsalesLeadName(): Promise<{ data: User[] }> {
    try {
      return await this.userService.getsalesLeadName();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getUsersWithRole(@Query('page') page: number, @Query('limit') limit: number, @Query('userName') userName: string,
    @Query('value') fullName: string): Promise<{ data: any[], total: number }> {
    try {
      return await this.userService.getUsersWithRoles(page, limit, userName, fullName)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getUserById(@Param('id') userId: number) {
    try {
      const user = await this.userService.getUserById(userId);
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() userData: CreateUserDto): Promise<User> {
    try {
      const updatedUser = await this.userService.updateUser(id, userData);
      return updatedUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    try {
      await this.userService.deleteUser(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
