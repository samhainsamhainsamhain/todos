import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CreateUserDto } from '../dtos/CreateUser.dto';
import { ValidateCreateUserPipe } from '../pipes/validate-create-user.pipe';
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
  createUser(@Body(ValidateCreateUserPipe) createUserDto: CreateUserDto) {
    const { confirmPassword, ...userDetails } = createUserDto;
    this.userService.createUser(userDetails);
    return;
  }

  @Put()
  updateUser() {}

  @Delete()
  deleteUser() {}
}
