import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async fetchUsers() {
    const users = await this.userService.fetchUsers();
    return users;
  }

  @Post()
  createUser() {}

  @Put()
  updateUser() {}

  @Delete()
  deleteUser() {}
}
